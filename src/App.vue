<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" @iconUpdate="iconUpdate()" />

      <!-- Window Toolbar -->
      <toolbar 
        @openSettings="themeSwitch()" 
        @openFile="openFile()" @openFolder="openFolder()" 
        @commentLine="$refs.editor.$refs.editor.commentSelection()" 
        @uncommentLine="$refs.editor.$refs.editor.uncommentSelection()" 
        />

      <!-- Window Body -->
      <div class="d-flex flex-grow-1 flex-row w-100">

        <direxplorer @iconUpdate="iconUpdate()" :dirTree="dirTree" @openFile="loadFile" />
        <div class="d-flex flex-grow-1 flex-column">
          <filetabs :files="files" @focusFile="focusFile" @closeFile="closeFile" />
          <codebox ref="editor" 
            @fileLoaded="fileLoaded" 
            @onUpdate="fileUpdate" 
            @openFile="openFile()"
            @saveFile="saveFile()"
            :content="file" 
            :filelang="fileType.toLowerCase()"
            :editorTheme="theme"
            />
        </div>

      </div>

      <!-- Window Footer -->
      <winfooter :files="0" :projectLength="0" :fileLength="fileLength" :filePath="filePath" :codeLanguage="fileType" editorVersion="1.0.1" />

    </div>
  </div>

</template>

<script>
// Electron remote:
const remote = require('@electron/remote')
var window = remote.getCurrentWindow()
const fs = require("fs")

// Custom js files:
//import * as editorIO from './js/input-output'
const editorIO = require('./js/input-output')
import editorTheme from "./js/editor-theme";

// Custom vue components:
import titlebar from './components/Window/Titlebar'
import toolbar from './components/Window/Toolbar'

import filetabs from './components/Editor/Tabs/Tabs'
import codebox from './components/Editor/CodeBox'
import direxplorer from './components/Editor/DirExplorer'

import winfooter from './components/Window/Footer'

// Icons component:
import feather from 'feather-icons'

export default {
  name: 'App',

  components: { titlebar, toolbar, filetabs, codebox, direxplorer, winfooter },

  data() {
    return {
      themeManager: null,
      theme: 'dark',

      fileType: '-',
      filePath: '-',
      fileLength: 0,
      files: [],
      file: null,

      dirTree: null
    }
  },

  mounted() {
    this.iconUpdate()
  },

  created() {
    this.themeManager = new editorTheme()

    this.themeManager.setDarkTheme()
  },

  methods: {
    // Minimize the current window.
    minimize () {
      window.minimize()
    },

    // Maximize / Unmaximize the current window.
    maximize () {
      if (window.isMaximized()) {
        window.unmaximize()
      }
      else {
        window.maximize()
      }
    },

    // Close the current window.
    close () {
      window.close()
    },

    // Switch the editor theme.
    themeSwitch() {
      this.themeManager.darkThemeSwitch();
      if (this.theme == 'dark')
        this.theme = 'light'
      else
        this.theme = 'dark'
    },

    // Update the icons.
    iconUpdate() {
      setTimeout(() => { feather.replace(); }, 10);
    },

    // Open a file dialogue.
    openFile() {
      editorIO.default.openFile().then(result => {
        if (result) {
          this.filePath = result.filepath
          this.file = result.filecontent
          this.files.push({ name: result.filename, path: result.filepath, type: result.extension, open: false, changed: false })
          this.focusFile(this.files[this.files.length - 1])
          this.iconUpdate()
        }
      })
    },

    // Save the open file.
    saveFile() {
      fs.writeFileSync(this.filePath, this.$refs.editor.$refs.editor.getValue())
      this.fileUpdate(this.$refs.editor.$refs.editor.getModel())
    },

    // Open a folder.
    openFolder() {
      editorIO.default.openFolder().then(result => {
        if (result) {
          console.log(result.nodes)
          this.dirTree = result.nodes
        }
      })
    },

    // Called when a new file is loaded.
    fileLoaded(path) {
      this.filePath = path
    },

    // Called when a file is updated.
    fileUpdate(model) {
      if (model) {
        // Update the line count.
        if (this.file)
          this.fileLength = model.getLineCount()
        else
          this.fileLength = 0

        if (this.files.length > 0) {
          // If the file has changed:
          if (model.getValue() != fs.readFileSync(this.filePath, 'utf8')) {
            this.files.find(f => f.open == true).changed = true
          } else {
            this.files.find(f => f.open == true).changed = false
          }
        }
      }
    },

    // Set the file type based on the file extension.
    setFileType(extension) {
      if (extension == 'cs')
        this.fileType = 'C#'
      else if (extension == 'cpp')
        this.fileType = 'C++'
      else
        this.fileType = extension.toUpperCase()
    },

    // Load a file from given path.
    loadFile(path) {
      this.filePath = path
      this.file = fs.readFileSync(path, 'utf8')

      // Get the full filename.
      const fullname = path.split('\\')[path.split('\\').length - 1]

      // Get the filename and extension seperate:
      const filename = fullname.split('.').slice(0, -1).join('.')
      const extension = fullname.split('.')[fullname.split('.').length - 1].toLowerCase()

      this.files.push({ name: filename, path: path, type: extension, open: false, changed: false })
      this.focusFile(this.files[this.files.length - 1])
      this.iconUpdate()
    },

    // Focus an already open file.
    focusFile(filedata) {
      var index = this.files.indexOf(filedata);
      if (index !== -1) {
        // If current file has changes:
        const currentFile = this.files.find(f => f.open == true)
        if (currentFile && currentFile.changed) {
          fs.writeFileSync(currentFile.path, this.$refs.editor.$refs.editor.getValue())
          currentFile.changed = false
        }

        // Set all files to not be open:
        for (let i = 0; i < this.files.length; i++) {
          this.files[i].open = false
        }

        // Set this file as open.
        this.files[index].open = true

        // Change the currently open file content.
        this.file = fs.readFileSync(filedata.path, 'utf8')
        this.filePath = filedata.path
        this.setFileType(filedata.type)
      }
    },

    // Close an open file.
    closeFile(filedata) {
      var index = this.files.indexOf(filedata);
      if (index !== -1) {
        // If file has changes:
        if (filedata.changed) {
          fs.writeFileSync(filedata.path, this.$refs.editor.$refs.editor.getValue())
        }

        // Remove the file.
        this.files.splice(index, 1);

        // If this file was the open one:
        if (filedata.open && this.files.length != 0) {
          this.focusFile(this.files[0])
        }

        // If there are no files left:
        if (this.files.length == 0) {
          this.filePath = '-'
          this.fileType = '-'
          this.fileLength = 0
          this.file = null
        }
      }
    },

    debug(msg) {
      console.log(msg)
    }
  }
}

</script>

<style>

#app {
  overflow: hidden;
  text-align: center;
  color: var(--text-light);
  background-color: var(--background-light);
}

</style>

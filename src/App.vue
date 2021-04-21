<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" @iconUpdate="iconUpdate()" />

      <!-- Window Toolbar -->
      <toolbar 
        @openSettings="themeSwitch()" 
        @openFile="openFile()" @openFolder="openFolder()" 
        @commentLine="debug('comment line')" 
        @uncommentLine="debug('uncomment line')" 
        />

      <!-- Window Body -->
      <div class="d-flex flex-grow-1 flex-row w-100">

        <direxplorer @iconUpdate="iconUpdate()" />
        <div class="d-flex flex-grow-1 flex-column">
          <filetabs :files="files" @focusFile="focusFile" @closeFile="closeFile" />
          <codebox @fileLoaded="fileLoaded" @onUpdate="fileUpdate" :content="file" />
        </div>

      </div>

      <!-- Window Footer -->
      <winfooter :files="0" :projectLength="0" :fileLength="fileLength" :filePath="filePath" :codeLanguage="fileType" editorVersion="1.0.1" />

    </div>
  </div>

</template>

<script>
// Electron remote:
import { remote } from 'electron'
var window = remote.getCurrentWindow()
const fs = require("fs")

// Custom js files:
import readDir from './js/input-output'
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

      fileType: '-',
      filePath: '-',
      fileLength: 0,
      files: [],
      file: ''
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
    },

    // Update the icons.
    iconUpdate() {
      setTimeout(() => { feather.replace(); }, 10);
    },

    // Open a file dialogue.
    openFile() {
      remote.dialog.showOpenDialog({ 
          properties: ['openFile']
      })
      .then(result => {
          if (result.canceled == false) {
              // Save the file and filepath:
              this.filePath = result.filePaths[0]
              this.file = fs.readFileSync(result.filePaths[0], 'utf8');

              // Save the file name:
              const filename = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]

              // Add the file to the tabs list:
              const _filename = filename.split('.').slice(0, -1).join('.')
              const _extension = filename.split('.')[filename.split('.').length - 1].toLowerCase()
              this.files.push({ name: _filename, path: this.filePath, type: _extension, open: false })
              this.focusFile(this.files[this.files.length - 1])
              this.iconUpdate()
          }
      })
    },

    // Save the open file.
    saveFile() {
      //fs.writeFileSync(this.filepath, this.$refs.editor.getValue())
      //console.log('saved ' + this.fileName + ' succesfully')
    },

    // Open a folder.
    openFolder() {
      remote.dialog.showOpenDialog({ 
        properties: ['openDirectory']
      })
      .then(result => {
        if (result.canceled == false) {
          this.dirName = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]

          this.dirTree.clear()

          var files = readDir(result.filePaths[0], [])
          files.forEach(file => this.dirTree.add(file));

          var obj = {}
          files.forEach(function(path) {
            path.split('\\').reduce(function(r, e) {
              return r[e] || (r[e] = {})
            }, obj)
          })

          this.dirObjects.clear()
          obj.forEach(o => this.dirObjects.add(o))

          console.log(this.dirObjects)

          this.$emit('iconUpdate')
        }
      })
    },

    // Called when a new file is loaded.
    fileLoaded(path) {
      this.filePath = path
    },

    // Called when a file is updated.
    fileUpdate(length) {
      this.fileLength = length
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

    // Focus an already open file.
    focusFile(filedata) {
      var index = this.files.indexOf(filedata);
      if (index !== -1) {
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
          this.file = ''
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

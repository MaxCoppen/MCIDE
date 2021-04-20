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
          <filetabs :files="files" />
          <codebox @fileLoaded="fileLoaded" @onUpdate="fileUpdate" :content="file" />
        </div>

      </div>

      <!-- Window Footer -->
      <winfooter :files="0" :projectLength="0" :fileLength="fileLength" :filePath="filePath" codeLanguage="C" editorVersion="1.0.1" />

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

      filePath: 'C:/',
      fileLength: 0,
      files: [],
      file: ''
    }
  },

  mounted() {
    this.files.push({ name: 'c_file', path: 'C:/System/file', type: 'c' })
    this.files.push({ name: 'js_file', path: 'D:/System/file', type: 'js' })

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

    openFile() {
      remote.dialog.showOpenDialog({ 
          properties: ['openFile']
      })
      .then(result => {
          if (result.canceled == false) {
              // Save the file and filepath:
              this.filepath = result.filePaths[0]
              this.file = fs.readFileSync(result.filePaths[0], 'utf8');

              // Save the file name:
              this.filename = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]
              this.$emit('fileLoaded', result.filePaths[0])

              // Add the file to the tabs list.
              this.files.push({ name: this.filename, path: result.filePaths[0], type: 'c' })
          }
      })
    },

    saveFile() {
      fs.writeFileSync(this.filepath, this.$refs.editor.getValue())
      console.log('saved ' + this.filename + ' succesfully')
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

    debug(msg) {
      console.log(msg)
    }
  }
}

</script>

<style>

body * {
    transition: background-color 0.2s, box-shadow 0.2s;
}

#app {
  overflow: hidden;
  text-align: center;
  color: var(--text-light);
  background-color: var(--background-light);
}

</style>

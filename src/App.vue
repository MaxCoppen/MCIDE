<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" @iconUpdate="iconUpdate()" />

      <!-- Window Toolbar -->
      <toolbar @openSettings="debug('open settings')" @commentLine="debug('comment line')" @uncommentLine="debug('uncomment line')" />

      <!-- Window Body -->
      <div class="d-flex flex-grow-1 flex-row w-100">

        <direxplorer @iconUpdate="iconUpdate()" />
        <codebox @fileLoaded="fileLoaded" @onUpdate="fileUpdate" />

      </div>

      <!-- Window Footer -->
      <winfooter :files="128" :projectLength="3216" :fileLength="fileLength" :filePath="filePath" codeLanguage="C" editorVersion="1.0.1" />

    </div>
  </div>

</template>

<script>
// Electron remote:
import { remote } from 'electron'
var window = remote.getCurrentWindow()

// Custom vue components:
import titlebar from './components/Window/Titlebar'
import toolbar from './components/Window/Toolbar'

import codebox from './components/Editor/CodeBox'
import direxplorer from './components/FileSystem/DirExplorer'

import winfooter from './components/Window/Footer'

// Icons component:
import feather from 'feather-icons'

export default {
  name: 'App',

  components: { titlebar, toolbar, codebox, direxplorer, winfooter },

  data() {
    return {
      filePath: 'C:/',
      fileLength: 0
    }
  },

  mounted() {
    feather.replace()
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

    // Update the icons.
    iconUpdate() {
      setTimeout(() => { feather.replace(); }, 10);
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

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  text-align: center;
  color: #D9D9D9;
  background-color: #404040;
}

</style>

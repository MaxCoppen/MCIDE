<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" />

      <!-- Window Toolbar -->
      <toolbar @openSettings="debug('open settings')" @commentLine="debug('comment line')" @uncommentLine="debug('uncomment line')" />

      <!-- Window Body -->
      <div class="d-flex flex-grow-1 flex-row w-100">
        <direxplorer/>
        <codebox/>
      </div>

      <!-- Window Footer -->
      <winfooter/>

    </div>
  </div>

</template>

<script>
// Electron remote:
import { remote } from 'electron'
var window = remote.getCurrentWindow()

// Custom vue components:
import titlebar from './components/Titlebar/Titlebar'
import toolbar from './components/Toolbar/Toolbar'

import codebox from './components/Body/CodeBox'
import direxplorer from './components/Body/DirExplorer'

import winfooter from './components/WindowFooter/Footer'

// Icons component:
import feather from 'feather-icons'

export default {
  name: 'App',

  components: { titlebar, toolbar, codebox, direxplorer, winfooter },

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
      feather.replace()
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
  text-align: center;
  color: #D9D9D9;
  background-color: #404040;
}

</style>

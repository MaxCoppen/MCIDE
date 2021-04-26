<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <Titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" @iconUpdate="iconUpdate()" />

      <!-- Window Body -->
      <div class="d-flex flex-grow-1 flex-row w-100">
        <router-view />
      </div>

      <!-- Window Footer -->
      <Footer :files="0" :projectLength="0" :fileLength="0" :filePath="'C:/'" :codeLanguage="'-'" editorVersion="2.0.0" />

    </div>
  </div>

</template>

<script>
// Electron inter process connection.
const ipc = window.require('electron').ipcRenderer

// Icon library.
const feather = require('feather-icons')

// Window components:
import Titlebar from './components/window/Titlebar'
import Footer from './components/window/Footer'

export default {
    name: 'App',

    components: { Titlebar, Footer },

    mounted() {
        feather.replace()

        ipc.on('menu-openfile', () => {
            console.log('open file')
        })

        ipc.on('menu-newproject', () => {
            console.log('new project')
        })

        ipc.on('menu-openproject', () => {
            console.log('open project')
        })
    }
}
</script>

<style>

#app {
  overflow: hidden;
  text-align: center;
  color: var(--text-light);
  background-color: var(--background);
}

</style>

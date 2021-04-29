<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <Titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" @iconUpdate="iconUpdate()" />

      <!-- Window Body -->
      <div class="app-body flex-grow-1 w-100">
        <div ref="free" class="free-windows d-flex">
          <window view="welcome"></window>
          <window view="editor"></window>
        </div>
        <div class="d-flex flex-row">
          
        </div>
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
import Window from './components/structure/Window'

export default {
    name: 'App',

    components: { Titlebar, Footer, Window },

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

#app * {
  transition: none;
}

#app {
  overflow: hidden;
  text-align: center;
  color: var(--text-light);
  background-color: var(--background);
}

.app-body {
  margin-bottom: 20px;
}

.free-windows {
  width: 100%;
  height: 100%;
}

</style>

<template>

  <div class="container-fluid p-0" style="height: 100vh">
    <div class="d-flex align-items-start flex-column h-100">

      <!-- Window Titlebar -->
      <Titlebar @minWindow="minimize()" @maxWindow="maximize()" @closeWindow="close()" @iconUpdate="iconUpdate()" />

      <!-- Window Body -->
      <div class="app-body flex-grow-1 w-100">
        <div ref="free" class="free-windows d-flex">
          <!--<window view="welcome"></window>-->
          <window view="editor"></window>
        </div>
        <div class="page-layout d-flex flex-row">
          <Layout :tree="tree" />
        </div>
      </div>

      <!-- Window Footer -->
      <Footer />

    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Electron inter process connection.
const ipc = window.require('electron').ipcRenderer

// Icon library.
const feather = require('feather-icons')

// Window components:
import Titlebar from '@/components/window/AppTitlebar.vue'
import Footer from '@/components/window/Footer.vue'
import Window from '@/components/structure/Window.vue'

import Layout from '@/components/structure/Layout.vue'

export default defineComponent({
    name: 'App',

    components: { Titlebar, Footer, Window, Layout },

    data() {
      return {
        tree: {
                name: 'base',
                layout: 'row',
                
                childern: [
                    {
                        name: 'column',
                        layout: 'col',

                        childern: [
                            {
                                name: 'item-1',
                                layout: 'row'
                            },
                            {
                                name: 'item-2',
                                layout: 'row'
                            }
                        ]
                    },
                    {
                        name: 'row',
                        layout: 'row',

                        childern: [
                            {
                                name: 'item-3',
                                layout: 'col'
                            },
                            {
                                name: 'item-4',
                                layout: 'col',
                                childern: [
                                    {
                                        name: 'item-5',
                                        layout: 'row'
                                    },
                                    {
                                        name: 'item-6',
                                        layout: 'row'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
      }
    },

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
})

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
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
}

.page-layout {
  width: 100%;
  height: 100%;
}

</style>

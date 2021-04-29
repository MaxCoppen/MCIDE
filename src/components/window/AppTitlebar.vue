<template>

<div class="title-bar">
    <div class="d-flex align-items-start flex-row h-100">

        <!-- Drag Bar -->
        <div class="dragbar center flex-grow-1">
            <h6 class="title monospace" @click="setPath('/')">
                MCIDE
            </h6>
        </div>

        <!-- Buttons Bar -->
        <div class="buttons">

            <div class="d-flex align-items-start flex-row w-100 h-100">

                <!-- Minimize Window Button -->
                <Button icon="minus" @onclick="minimize()" size="80%" stroke="2px" class="window-button" />

                <!-- Maximize Window Button -->
                <Button v-show="maximized" icon="minimize" size="55%" stroke="2.5px" @onclick="maximize()" class="window-button" />
                <Button v-show="!maximized" icon="square" size="55%" stroke="2.5px" @onclick="maximize()" class="window-button" />

                <!-- Close Window Button -->
                <Button icon="x" @onclick="close()" size="80%" stroke="2px" class="close-button" />

            </div>

        </div>

    </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Electron inter process connection.
const ipc = window.require('electron').ipcRenderer

import Button from '@/components/general/IconButton.vue'

export default defineComponent({
    name: 'app-titlebar',

    components: { Button },

    data() {
        return {
            maximized: false
        };
    },

    mounted() {
        ipc.on('app-maximized', () => {
            this.maximized = true
        })

        ipc.on('app-unmaximized', () => {
            this.maximized = false
        })
    },

    methods: {

        maximize() {
            ipc.send('maximize')
        },

        minimize() {
            ipc.send('minimize')
        },

        close() {
            ipc.send('close')
        },

        setPath(new_path: string) {
            this.$router.push(new_path)
        }

    },
})

</script>

<style scoped>

.title-bar {
    user-select: none;
    -webkit-user-select: none;
    background-color: var(--background-dark);
    width: 100%;
    height: 20px;
}

.title {
    -webkit-app-region: no-drag;
    color: var(--text-darker);
    font-weight: 600; 
    letter-spacing: 1px; 
    font-size: 12px; 
    margin: -1px 0px 0px 1px;
    text-align: left; 
    line-height: 100%;
    width: 42px;
    transition: color 0.2s;
    cursor: pointer;
}

.title:hover {
    color: var(--text-light);
}

.dragbar {
    -webkit-app-region: drag;
    margin-left: 5px;
    margin-top: 5px;
    height: 15px;
}

.buttons {
    width: 90px;
    height: 100%;
    text-align: right;
}

.window-button {
    background-color: var(--background-dark);
    color: var(--text-darker);
}

.window-button:hover {
    background-color: var(--background-light);
    color: var(--text-light);
}

.window-button:active {
    background-color: var(--background-darker);
    color: var(--text-light);
}

.close-button {
    background-color: var(--background-dark);
    color: var(--text-darker);
}

.close-button:hover {
    background-color: #FF5050;
    color: var(--text-light);
}

.close-button:active {
    background-color: #C00000;
}

</style>
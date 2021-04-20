<script>
// Electron remote:
import { remote } from 'electron'
var window = remote.getCurrentWindow()

import Button from '../Buttons/WindowButton'

export default {
    components: { Button },

    data() {
        return {
            maximized: false
        };
    },

    mounted() {
        window.on('maximize', () => {
            this.maximized = true
        })

        window.on('unmaximize', () => {
            this.maximized = false
        })
    },

    methods: {

        maximize() {
            this.$emit('maxWindow')
        },

    },
}

</script>

<template>

<div class="title-bar">
    <div class="d-flex align-items-start flex-row h-100">

        <!-- Drag Bar -->
        <div class="dragbar center flex-grow-1">
            <h6 class="title monospace">
                MCIDE
            </h6>
        </div>

        <!-- Buttons Bar -->
        <div class="buttons">

            <div class="d-flex align-items-start flex-row w-100 h-100">

                <!-- Minimize Window Button -->
                <Button icon="minus" stroke="2px" height="16px" @onclick="$emit('minWindow')" />

                <!-- Maximize Window Button -->
                <Button v-show="maximized" icon="minimize" stroke="3px" height="12px" @onclick="maximize()" />
                <Button v-show="!maximized" icon="maximize" stroke="3px" height="12px" @onclick="maximize()" />

                <!-- Close Window Button -->
                <Button icon="x" stroke="2px" height="16px" @onclick="$emit('closeWindow')" class="close-button" />

            </div>

        </div>

    </div>
</div>

</template>

<style scoped>

.title-bar {
    user-select: none;
    -webkit-user-select: none;
    background-color: var(--background-dark);
    width: 100%;
    height: 30px;
}

.title {
    -webkit-app-region: no-drag;
    color: #7F7F7F;
    font-weight: 600; 
    letter-spacing: 1px; 
    font-size: 12px; 
    margin: 4px 0px 0px 3px;
    text-align: left; 
    line-height: 100%;
    width: 42px;
    transition: all 0.2s;
}

.title:hover {
    color: #D9D9D9;
    transition: all 0.2s;
}

.dragbar {
    -webkit-app-region: drag;
    margin-left: 5px;
    margin-top: 5px;
    height: 25px;
}

.buttons {
    width: 90px;
    height: 100%;
    text-align: right;
}

.close-button:hover {
    background-color: #FF5050;
    color: #D9D9D9;
}

.close-button:active {
    background-color: #C00000;
}

</style>
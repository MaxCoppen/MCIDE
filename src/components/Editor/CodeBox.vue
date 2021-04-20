<template>

    <div class="code-box flex-grow-1">
        <div class="d-flex flex-column w-100 h-100">
            <monaco ref="editor" @onUpdate="onUpdate" @openFile="openFile()" @saveFile="saveFile()" />
        </div>
    </div>

</template>

<script>
const { remote } = require('electron')
const fs = require("fs")

import monaco from './Monaco/MonacoEditor'

export default {
    components: { monaco },

    props: {
        content: String
    },

    watch: {
        content() {
            this.$refs.editor.setContent(this.content)
        }
    },

    data() {
        return {
            filepath: '',
            filename: ''
        }
    },

    methods: {
        openFile() {
            remote.dialog.showOpenDialog({ 
                properties: ['openFile']
            })
            .then(result => {
                if (result.canceled == false) {
                    this.filepath = result.filePaths[0]
                    var data = fs.readFileSync(result.filePaths[0], 'utf8');
                    this.$refs.editor.setContent(data)
                    this.filename = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]
                    this.$emit('fileLoaded', result.filePaths[0])
                }
            })
        },

        saveFile() {
            fs.writeFileSync(this.filepath, this.$refs.editor.getValue())
            console.log('saved ' + this.filename + ' succesfully')
        },

        onUpdate(length) {
            this.$emit('onUpdate', length)
        }
    }
}

</script>

<style>

.code-box {
    background-color: var(--background);
    color: var(--text-dark);

    width: 100%;
    height: 100%;
}

</style>

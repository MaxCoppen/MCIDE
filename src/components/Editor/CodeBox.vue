<template>

    <div class="code-box flex-grow-1">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar :filename="filename" @openFile="openFile()" />
            <monaco ref="editor" @onUpdate="onUpdate" />
        </div>
    </div>

</template>

<script>
const { remote } = require('electron')
const fs = require("fs")

import toolbar from '../FileSystem/CodeToolbar'
import monaco from './MonacoEditor'

export default {
    components: { toolbar, monaco },

    data() {
        return {
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
                    var data = fs.readFileSync(result.filePaths[0], 'utf8');
                    this.$refs.editor.setContent(data)
                    this.filename = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]
                    this.$emit('fileLoaded', result.filePaths[0])
                }
            })
        },

        onUpdate(length) {
            this.$emit('onUpdate', length)
        }
    }
}

</script>

<style>

.code-box {
    background-color: #333333;
    color: #7F7F7F;
}

</style>

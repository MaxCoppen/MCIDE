<template>

    <div class="code-box flex-grow-1">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar @openFile="openFile()" />
            <div class="w-100 flex-grow-1" style="text-align: left">
                {{contents}}
            </div>
        </div>
    </div>

</template>

<script>
const { remote } = require('electron')
const fs = require("fs")

import toolbar from '../FileSystem/CodeToolbar'

export default {
    components: { toolbar },

    data() {
        return { contents: { type: String, default: '' } }
    },

    methods: {
        openFile() {
            remote.dialog.showOpenDialog({ 
                properties: ['openFile']
            })
            .then(result => {
                if (result.canceled == false) {
                    
                    var data = fs.readFileSync(result.filePaths[0], 'utf8');
                    this.contents = data

                }
            })
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

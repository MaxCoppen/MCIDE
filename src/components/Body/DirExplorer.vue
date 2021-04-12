<template>
    
    <div class="dir-explorer">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar :projectName="dirName" @openFolder="openFolder()" />

            <div class="dir-panel flex-grow-1 overflow-auto">
                <div class="directories">
                    <div v-for="dir in dirTree" :key="dir" class="d-flex flex-row">

                        <!-- If last char is not '/' then this is not a folder -->
                        <div class="d-flex" :style="{ marginLeft: dir.slice(-1) != '\\' ? (dir.replace(/[^\\]/g, '').length * 15) + 'px' : (dir.replace(/[^\\]/g, '').length * 15 - 15) + 'px' }" >

                            <i v-if="!(dir.slice(-1) == '\\')" class="ico" data-feather="file"></i>
                            <i v-if="dir.slice(-1) == '\\'" class="ico" data-feather="folder"></i>

                        </div>

                        <div class="d-flex flex-grow-1">

                            <p class="directory-name">{{ dir.slice(-1) != '\\' ? dir.split('\\')[dir.split('\\').length - 1] : dir.split('\\')[dir.split('\\').length - 2]}}</p>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
//import fs from 'fs'
const { remote } = require('electron')

import toolbar from '../Toolbars/DirToolBar'

export default {
    components: { toolbar },

    data() {
        return {
            dirName: '-',
            dirTree: new Set([])
        }
    },

    methods: {
        /* Open a folder */
        openFolder() {
            const fs = require("fs")
            const path = require("path")

            const getAllFiles = function(dirPath, arrayOfFiles) {
                var files = fs.readdirSync(dirPath)

                arrayOfFiles = arrayOfFiles || []

                files.forEach(function(file) {
                    
                    // If folder then look inside of it.
                    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                        // Push this folder and add a '/'.
                        arrayOfFiles.push(path.join(dirPath.split('\\')[dirPath.split('\\').length - 1], "/", file + '/'))

                        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                    } else {
                        // Push this file.
                        arrayOfFiles.push(path.join(dirPath.split('\\')[dirPath.split('\\').length - 1], "/", file))
                    }
                })

                return arrayOfFiles
            }

            remote.dialog.showOpenDialog({ 
                properties: ['openDirectory']
            })
            .then(result => {
                if (result.canceled == false) {
                    this.dirName = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]

                    this.dirTree.clear()

                    var files = getAllFiles(result.filePaths[0], [])
                    files.forEach(file => this.dirTree.add(file));

                    this.$emit('iconUpdate')
                }
            })
        }
    }
}

</script>

<style>

.dir-explorer {
    user-select: none;
    -webkit-user-select: none;
    background-color: #222222;
    color: #7F7F7F;

    width: calc(100vw / 4);
    min-width: 150px;
    max-width: 350px;
}

.dir-panel {
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 110px);
}

.directories {
    width: 100%;
    height: 100%;
    margin-left: -7.5px;
}

.directory-name {
    margin: auto;
    margin-left: 7.5px;
    overflow: hidden;
    white-space: nowrap;
}

.ico {
    height: 15px;
    width: 15px;
    margin: auto;
}

/* Scrollbar Styling */

::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
	background-color: transparent;
}

::-webkit-scrollbar {
	width: 8px;
    height: 8px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    border: 2px solid #222222;
	background-color: #555555;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #777777;
}

</style>
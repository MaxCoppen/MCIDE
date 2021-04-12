<template>
    
    <div class="dir-explorer">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar :projectName="dirName" @openFolder="openFolder()" />

            <div class="dir-panel flex-grow-1 overflow-auto">
                <div class="directories">
                    <filebutton v-for="dir in dirTree" :key="dir" :dir="dir" />

                    <!--<div v-for="dir in dirTree" :key="dir" class="d-flex flex-row">

                        If last char is not '/' then this is not a folder 
                        <div class="d-flex" :style="{ marginLeft: dir.slice(-1) != '\\' ? (dir.replace(/[^\\]/g, '').length * 15) + 'px' : (dir.replace(/[^\\]/g, '').length * 15 - 15) + 'px' }" >

                            <i v-if="!(dir.slice(-1) == '\\')" class="ico" data-feather="file"></i>
                            <i v-if="dir.slice(-1) == '\\'" class="ico" data-feather="folder"></i>

                        </div>

                        <div class="d-flex flex-grow-1">

                            <p class="directory-name">{{ dir.slice(-1) != '\\' ? dir.split('\\')[dir.split('\\').length - 1] : dir.split('\\')[dir.split('\\').length - 2]}}</p>

                        </div>

                    </div>-->
                </div>
            </div>

        </div>
    </div>

</template>

<script>
const { remote } = require('electron')
import readDir from '../../js/input-output'

import toolbar from '../Toolbars/DirToolBar'
import filebutton from '../Buttons/FileButton'

export default {
    components: { toolbar, filebutton },

    data() {
        return {
            dirName: '-',
            dirTree: new Set([])
        }
    },

    methods: {
        // Open a folder.
        openFolder() {
            remote.dialog.showOpenDialog({ 
                properties: ['openDirectory']
            })
            .then(result => {
                if (result.canceled == false) {
                    this.dirName = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]

                    this.dirTree.clear()

                    var files = readDir(result.filePaths[0], [])
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
    min-width: 200px; /* Fit this size ! Not responsive ! */
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
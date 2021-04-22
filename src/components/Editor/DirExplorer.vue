<template>
    
<div class="dir-explorer">
    <div class="directories">
        <tree-view v-if="dirTree" :node="dirTree" :depth="0" @openFile="openFile" />
    </div>
</div>

</template>

<script>
import TreeView from './Files/File'

export default {
    components: { TreeView },

    props: {
        dirTree: Object
    },

    methods: {
        openFile(path) {
            this.$emit('openFile', path)
        }
    }
}

</script>

<style>

.dir-explorer {
    user-select: none;
    -webkit-user-select: none;
    background-color: var(--background-dark);
    color: var(--text-dark);

    z-index: 2;

    resize: horizontal;
    min-width: clamp(150px, calc(100vw / 4), 350px);
    height: 100%;
    /*width: clamp(150px, calc(100vw / 4), 350px) !important;
    min-width: clamp(150px, calc(100vw / 4), 350px) !important;*/
}

.dir-panel {
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 110px);
}

.directories {
    width: 100%;
    height: 100%;
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
    border: 2px solid var(--background-dark);
	background-color: var(--text-darker);
}

::-webkit-scrollbar-thumb:hover {
    background-color: var(--text);
}

</style>
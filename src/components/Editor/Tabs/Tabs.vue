<template>
<div class="tabs d-flex flex-row">
    <file-tab 
        v-for="file in files" :key="file" :filedata="file" 
        @focusFile="focusFile" @closeFile="closeFile"
        />
</div>
</template>

<script>
import FileTab from './Tab'

export default {
    components: { FileTab },

    props: {
        files: [Object]
    },

    methods: {
        focusFile(filedata) {
            this.$emit('focusFile', filedata)
        },

        closeFile(filedata) {
            this.$emit('closeFile', filedata)
        }
    }
}
</script>

<style scoped>

.tabs {
    background-color: var(--background);
    color: var(--text-dark);

    z-index: 1;
    box-shadow: 0px 5px 10px var(--shadow);

    height: 30px;
    width: calc(100vw - clamp(150px, calc(100vw / 4), 350px));

    overflow: overlay;
    padding:0;
}

/* Scrollbar Styling */

::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
	background-color: transparent !important;
}

::-webkit-scrollbar {
    height: 4px;
	background-color: transparent !important;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--background-dark) !important;
}

::-webkit-scrollbar-thumb:hover {
    background-color: var(--background-lighter) !important;
}


</style>
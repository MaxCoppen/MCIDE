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
    width: 100%;
}

</style>
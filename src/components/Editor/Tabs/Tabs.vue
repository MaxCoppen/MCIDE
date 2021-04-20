<template>
<div class="tabs d-flex flex-row">
    <file-tab v-for="file in files" :key="file" :filedata="file" />
</div>
</template>

<script>
import FileTab from './Tab'

export default {
    components: { FileTab },

    props: {
        files: [Object]
    }
}
</script>

<style scoped>

.tabs {
    background-color: #333333;
    color: #7F7F7F;

    z-index: 1;
    box-shadow: 0px 5px 10px #22222266;

    height: 30px;
    width: 100%;
}

</style>
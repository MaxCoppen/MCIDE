<template>

<div class="footer">
    <div class="d-flex align-items-start flex-row h-100">

        <!-- Directory Information -->
        <div class="dir-info d-flex justify-content-start h-100">

            <i class="ico" data-feather="file"></i>
            <p class="txt monospace"> {{files}} </p>

            <i class="ico" data-feather="file-text"></i>
            <p class="txt monospace"> {{projectLength}} </p>

        </div>

        <!-- File Information -->
        <div class="d-flex justify-content-start h-100">

            <i class="ico" data-feather="code"></i>
            <p class="txt monospace"> {{fileLength}} </p>

            <i class="ico" data-feather="at-sign"></i>
            <p class="txt monospace"> {{filePath}} </p>

        </div>

        <!-- Code Information -->
        <div class="d-flex justify-content-end flex-grow-1 h-100">

            <i class="ico" data-feather="command"></i>
            <p class="txt monospace"> {{codeLanguage}} </p>

            <i class="ico" data-feather="hash"></i>
            <p class="txt monospace"> {{editorVersion}} </p>

        </div>

    </div>
</div>

</template>

<script>

export default {
    props: {
        files: {
            type: Number,
            default: 0
        },
        projectLength: {
            type: Number,
            default: 0
        },

        fileLength: {
            type: Number,
            default: 0
        },
        filePath: {
            type: String,
            default: '-'
        },

        codeLanguage: {
            type: String,
            default: '-'
        },
        editorVersion: {
            type: String,
            default: '1.0.0'
        },
    },
}

</script>

<style scoped>

.footer {
    user-select: none;
    -webkit-user-select: none;

    background-color: #404040;
    overflow: hidden;

    position: fixed;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 20px;
}

.dir-info {
    width: calc(100vw / 4) !important;
    min-width: 150px;
    max-width: 350px;
}

.ico {
    color: #7F7F7F;
    height: 12px;
    width: 12px;
    margin: 4px 3px 0px 3px;
}

.txt {
    color: #7F7F7F;
    font-weight: 600;
    font-size: 12px;

    padding-right: 5px;
    margin-top: 0.5px;

    width: auto;
}

</style>
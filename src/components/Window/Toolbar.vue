<template>

    <div class="toolbar">
        <div class="d-flex align-items-start flex-row h-100">

            <!-- Left Side -->
            <div class="left-side d-flex align-items-start">

                <!-- Settings Button -->
                <Button icon="settings" stroke="2px" height="16px" @onclick="$emit('openSettings')" class="btn-left" />

                <!-- Open Folder Button -->
                <Button icon="folder" stroke="2px" height="16px" @onclick="$emit('openFolder')" class="btn-left" />

                <!-- Open File Button -->
                <Button icon="file" stroke="2px" height="16px" @onclick="$emit('openFile')" class="btn-left" />

            </div>

            <!-- Right Side -->
            <div class="tools">

                <div class="d-flex flex-row w-100 h-100">

                    <!-- Comment Button -->
                    <Button icon="align-right" stroke="2px" height="16px" @onclick="$emit('commentLine')" class="btn-right comment-line" />

                    <!-- Uncomment Button -->
                    <Button icon="align-right" stroke="2px" height="16px" @onclick="$emit('uncommentLine')" class="btn-right" />

                </div>

            </div>

        </div>
    </div>

</template>

<script>

import Button from '../Buttons/IconButton'

export default {
    components: { Button },
}

</script>

<style scoped>

.toolbar {
    user-select: none;
    -webkit-user-select: none;
    background-color: var(--background-light);
    width: 100%;
    height: 30px;
}

.left-side {
    width: calc(100vw / 4) !important;
    min-width: 150px;
    max-width: 350px;
    height: 100%;
}

.tools {
    width: 60px;
    height: 100%;
    text-align: right;
}

.btn-left:hover {
    background-color: var(--background-lighter);
    color: var(--text-dark);
}

.btn-left:active {
    background-color: var(--background-dark);
    color: var(--text-light);
}

.btn-right:hover {
    background-color: var(--background-lighter);
    color: var(--text-dark);
}

.btn-right:active {
    background-color: var(--background);
    color: var(--text-light);
}

.comment-line {
    color: #798f54 !important;
}

.comment-line:active {
    color: #97b369 !important;
}

</style>
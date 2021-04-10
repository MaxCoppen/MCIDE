<script>

import Button from '../Buttons/IconButton'

export default {
    components: { Button },
}

</script>

<template>

<div class="tool-bar">
    <div class="d-flex align-items-start flex-row h-100">

        <!-- Drag Bar -->
        <div class="d-flex justify-content-start flex-row w-100 h-100">

            <!-- Settings Button -->
            <Button icon="settings" stroke="2px" height="16px" @onclick="$emit('openSettings')" class="btn" />

        </div>

        <!-- Tool Bar -->
        <div class="tools">

            <div class="d-flex justify-content-end flex-row w-100 h-100">

                <!-- Comment Button -->
                <Button icon="align-right" stroke="2px" height="16px" @onclick="$emit('commentLine')" class="btn comment-line" />

                <!-- Uncomment Button -->
                <Button icon="align-right" stroke="2px" height="16px" @onclick="$emit('uncommentLine')" class="btn" />

            </div>

        </div>

    </div>
</div>

</template>

<style scoped>

.tool-bar {
    user-select: none;
    -webkit-user-select: none;
    background-color: #404040;
    width: 100%;
    height: 30px;
}

.tools {
    width: 60px;
    height: 100%;
    text-align: right;
}

.btn:hover {
    background-color: #4d4d4d;
    color: #7F7F7F;
}

.btn:active {
    background-color: #222222;
    color: #D9D9D9;
}

.comment-line {
    color: #798f54 !important;
}

.comment-line:active {
    color: #97b369 !important;
}

</style>
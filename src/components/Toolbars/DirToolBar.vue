<template>

    <!-- Directory Toolbar -->
    <div class="dir-toolbar">

        <div class="d-flex align-items-start flex-row h-100">

            <!-- Left Side -->
            <div class="d-flex justify-content-start flex-row w-100 h-100">

                <!-- Open Project Button -->
                <Button icon="folder" stroke="2px" height="16px" @onclick="$emit('openSettings')" class="btn" />

            </div>

            <!-- Right Side -->
            <div class="tools">

                <div class="d-flex justify-content-end flex-row w-100 h-100">

                    <!-- Build Project Button -->
                    <Button icon="download" stroke="2px" height="16px" @onclick="$emit('commentLine')" class="btn comment-line" />

                    <!-- Save Project Button -->
                    <Button icon="save" stroke="2px" height="16px" @onclick="$emit('uncommentLine')" class="btn" />

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

.dir-toolbar {
    user-select: none;
    -webkit-user-select: none;
    background-color: #222222;
    width: 100%;
    height: 30px;
}

.tools {
    height: 100%;
}

.btn {
    background-color: #222222;
    color: #555555;
}

.btn:hover {
    background-color: #333333;
    color: #7F7F7F;
}

.btn:active {
    background-color: #222222;
    color: #D9D9D9;
}

</style>
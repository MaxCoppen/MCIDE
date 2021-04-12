<template>

    <!-- Directory Toolbar -->
    <div class="dir-toolbar">

        <div class="d-flex align-items-start flex-row h-100">

            <!-- Left Side -->
            <div class="left-side d-flex justify-content-start flex-row flex-grow-1">

                <!-- Open Project Button -->
                <Button icon="folder" stroke="2px" height="16px" @onclick="$emit('openFolder')" class="btn" style="min-width: 30px" />

                <div class="project-name"> {{projectName}} </div>

            </div>

            <!-- Right Side -->
            <div class="right-side d-flex justify-content-end flex-row">

                    <!-- Build Project Button -->
                    <Button icon="download" stroke="2px" height="16px" @onclick="$emit('buildProject')" class="btn" />

                    <!-- Save Project Button -->
                    <Button icon="save" stroke="2px" height="16px" @onclick="$emit('saveProject')" class="btn" />

                </div>
        </div>
    </div>

</template>

<script>

import Button from '../Buttons/IconButton'

export default {
    components: { Button },

    props: {
        projectName: {
            type: String,
            default: '-'
        },
    },
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

.right-side {
    width: 60px;
    height: 100%;
}

.left-side {
    min-width: 30px;
    width: 100%;
    height: 100%;
}

.project-name {
    color: #555555;
    text-transform: uppercase;
    white-space: nowrap;
    overflow:hidden;
    font-size: clamp(12.5px, 2.25vw, 15px);
    font-weight: 450;
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 5px;
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
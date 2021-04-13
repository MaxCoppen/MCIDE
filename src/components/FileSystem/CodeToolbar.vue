<template>

    <div class="file-toolbar">
        <div class="d-flex align-items-start flex-row h-100">

            <!-- Left Side -->
            <div class="d-flex justify-content-start flex-row w-100 h-100">

                <!-- Open File Button -->
                <Button icon="file" stroke="2px" height="16px" @onclick="$emit('openFile')" class="btn" />

                <p class="filename"> {{filename}} </p>

            </div>

            <!-- Right Side -->
            <div class="d-flex justify-content-end flex-row w-100 h-100">

                <!-- Save File Button -->
                <Button icon="save" stroke="2px" height="16px" @onclick="$emit('saveFile')" class="btn" />

            </div>

        </div>
    </div>

</template>

<script>

import Button from '../Buttons/IconButton'

export default {
    components: { Button },

    props: {
        filename: {
            type: String,
            default: ''
        },
    },
}

</script>

<style scoped>

.file-toolbar {
    user-select: none;
    -webkit-user-select: none;
    background-color: #333333;
    width: 100%;
    height: 30px;
}

.tools {
    width: 60px;
    height: 100%;
    text-align: right;
}

.filename {
    user-select: text;
    -webkit-user-select: text;
    color: #666666;
}

.btn {
    background-color: #333333;
    color: #666666;
}

.btn:hover {
    background-color: #404040;
    color: #7F7F7F;
}

.btn:active {
    background-color: #333333;
    color: #D9D9D9;
}

</style>
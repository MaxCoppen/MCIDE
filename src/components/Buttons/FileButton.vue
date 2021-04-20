<template>

<button class="btn d-flex flex-row" @click="buttonClicked()">
    
    <!--If last char is not '/' then this is not a folder -->
    <div class="d-flex" :style="{ marginLeft: dir.slice(-1) != '\\' ? (dir.replace(/[^\\]/g, '').length * 15) + 'px' : (dir.replace(/[^\\]/g, '').length * 15 - 15) + 'px' }" >

        <i v-if="!(dir.slice(-1) == '\\')" class="ico" data-feather="file"></i>
        <i v-if="dir.slice(-1) == '\\'" class="ico" data-feather="folder"></i>

    </div>

    <div class="d-flex flex-grow-1">

        <p class="directory-name">{{ dir.slice(-1) != '\\' ? dir.split('\\')[dir.split('\\').length - 1] : dir.split('\\')[dir.split('\\').length - 2]}}</p>

    </div>

</button>

</template>

<script>

export default {
    props: {
        dir: String
    },
    methods: {
        buttonClicked() {
            this.$emit('onclick')
        }
    }
}

</script>

<style scoped>

button {
    background-color: var(--background-dark);
    color: var(--text-darker);

    box-shadow: none !important; 
    outline: 0 !important;

    border-radius: 0;

    width: 100%;
    height: 30px;
    padding: 0;
    transition: all 0.2s;
}

button:hover {
    background-color: var(--background);
    color: var(--text);
    transition: all 0.2s;
}

button:active {
    background-color: var(--background-dark);
    color: var(--text-light);
    transition: all 0.2s;
}

.directory-name {
    margin: auto;
    margin-left: 5px;
    padding-right: 7.5px;
    overflow: hidden;
    white-space: nowrap;
}

.ico {
    height: 15px;
    width: 15px;
    margin: auto;
    margin-top: 5px;
}

</style>
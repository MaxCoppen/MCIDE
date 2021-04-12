<template>
    
    <div class="dir-explorer">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar/>

            <div class="w-100 flex-grow-1">
                <div class="directories">
                    <div v-for="dir in dirTree" :key="dir.name" class="d-flex flex-row">

                        <!-- If last char is not '/' then this is not a folder -->
                        <div class="d-flex" :style="{ marginLeft: dir.slice(-1) != '/' ? (dir.replace(/[^/]/g, '').length * 7) + 'px' : (dir.replace(/[^/]/g, '').length * 7 - 7) + 'px' }" >

                            <i v-if="!(dir.slice(-1) == '/')" class="ico" data-feather="file"></i>
                            <i v-if="dir.slice(-1) == '/'" class="ico" data-feather="folder"></i>

                        </div>

                        <div class="d-flex flex-grow-1">

                            <p class="directory-name">{{ dir.slice(-1) != '/' ? dir.split('/')[dir.split('/').length - 1] : dir.split('/')[dir.split('/').length - 2]}}</p>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import toolbar from '../Toolbars/DirToolBar'

export default {
    components: { toolbar },

    props: {
        dirTree: Array,
    }
}

</script>

<style>

.dir-explorer {
    user-select: none;
    -webkit-user-select: none;
    background-color: #222222;
    color: #7F7F7F;

    width: calc(100vw / 4);
    min-width: 150px;
    max-width: 350px;
}

.directories {
    width: 100%;
    height: 100%;
    margin-left: 7.5px;
}

.directory-name {
    margin: auto;
    margin-left: 7.5px;
    overflow: hidden;
    white-space: nowrap;
}

.ico {
    height: 15px;
    width: 15px;
    margin: auto;
}

</style>
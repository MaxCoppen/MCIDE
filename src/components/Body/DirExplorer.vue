<template>
    
    <div class="dir-explorer">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar/>
            <div class="w-100 flex-grow-1">
                
            </div>
        </div>
    </div>

</template>

<script>
import toolbar from '../Toolbars/DirToolBar'

export default {
    components: { toolbar }
}

</script>

<style>

.dir-explorer {
    background-color: #222222;
    color: #7F7F7F;

    width: calc(100vw / 4);
    min-width: 150px;
    max-width: 350px;
}

</style>
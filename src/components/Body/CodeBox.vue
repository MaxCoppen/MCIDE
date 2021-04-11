<template>

    <div class="code-box flex-grow-1">
        <div class="d-flex flex-column w-100 h-100">
            <toolbar/>
            <div class="w-100 flex-grow-1">
                
            </div>
        </div>
    </div>

</template>

<script>
import toolbar from '../Toolbars/FileToolBar'

export default {
    components: { toolbar }
}

</script>

<style>

.code-box {
    background-color: #333333;
    color: #7F7F7F;
}

</style>

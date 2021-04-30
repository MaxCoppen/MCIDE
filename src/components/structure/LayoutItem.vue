<template>

<div class="grid-content d-flex flex-column">
    <a v-if="!tree.childern">{{tree.name}}</a>

    <div class="layout-panel d-flex" v-if="tree.childern" :class="{ 'flex-row': tree.layout != 'row', 'flex-column': tree.layout == 'col' }">
        <child-panel v-for="(child, index) in tree.childern" :key="index" :tree="child" />
    </div>
</div>

</template>

<script>

export default {
    name: 'layout-item',

    props: {
        tree: Object
    }
}

</script>

<style scoped>

@import '../../css/layout.css';

</style>
<template>

<div class="lm-indicator" />

<div class="lm-root">

</div>

</template>

<script>
import LayoutItem from './LayoutItem.vue'

export default {
    name: 'layout-manager',

    components: { LayoutItem },

    props: {
        tree: Object
    }
}

</script>

<style scoped>

@import '../../css/layout.css';

</style>
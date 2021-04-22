<template>
<li>
    <div :class="{bold: isFolder}"
         @click="onclick()">

         {{ node.name }}
        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="nodes">
        <node
            class="node"
            v-for="(child, index) in node.nodes"
            :key="index"
            :node="child"
            @openFile="openFile"
            />
    </ul>
</li>
</template>

<script>

export default {
    name: 'node',

    props: {
        node: Object
    },

    data() {
        return {
            isOpen: false
        }
    },

    computed: {
        isFolder() {
            return this.node && this.node.nodes.length
        }
    },

    methods: {
        onclick() {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            } else {
                this.openFile(this.node.path)
            }
        },

        openFile(path) {
            this.$emit('openFile', path)
        }
    }
}

</script>

<style scoped>

.node {
    width: 100%;

    background-color: var(--background);
    color: var(--text);
}

.node:hover {
    background-color: var(--background-light);
    color: var(--text);
}

.nodes {
    color: var(--text);
}

</style>

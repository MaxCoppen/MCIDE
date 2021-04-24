<template>

<div class="node">

    <!-- Node Information -->
    <div :class="{'node-folder': isFolder}" class="node-info d-flex flex-row justify-content-start" @click="onclick()">

        <div :style="{ 'width': (depth * 10 + 5) + 'px' }"></div>

        <!-- Node Icon -->
        <img v-if="!isFolder" class="file-icon" :src=iconurl>

        <!-- Node Chevron -->
        <div v-show="!isOpen" v-if="isFolder" class="open-ico-parent"><i class="open-ico" data-feather="chevron-right"></i></div>
        <div v-show="isOpen" v-if="isFolder" class="open-ico-parent"><i class="open-ico" data-feather="chevron-down"></i></div>

        <p class="node-title">{{ isFolder ? node.name.toLowerCase() : node.name }}</p>

    </div>

    <!-- Child Nodes -->
    <div v-show="isOpen" v-if="isFolder" class="node-container">
        <node
            v-for="(child, index) in node.nodes"
            :key="index"
            :node="child"
            :depth="depth + 1"
            @openFile="openFile"
            />
    </div>

</div>

</template>

<script>

export default {
    name: 'node',

    props: {
        node: Object,
        depth: Number
    },

    data() {
        return {
            isOpen: false,
            iconurl: './file-icons/txt.png'
        }
    },

    created() {
        const languages = [
            'js', 'ts',
            'json',
            'html', 'css',
            'c', 'cs', 'cpp',
            'vue'
        ]

        const ext = languages.includes(this.node.type);

        if (ext)
            this.iconurl = './file-icons/' + this.node.type + '.png'
        else if (this.node.type != 'folder' && this.node.type != 'base-folder')
            this.iconurl = './file-icons/txt.png'
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

.node-parent {
    width: 100%;
    height: fit-content;
}

.node-container {
    width: 100%;
    height: fit-content;
}

.node {
    width: 100%;
    height: fit-content;

    white-space: nowrap;
    overflow: hidden;
    text-align: left;
}

.node-folder {
    font-weight: 500;
    font-variant: small-caps;
    color: var(--text-dark) !important;
}

.node-info {
    position: relative;
    background-color: var(--background-dark);
    color: var(--text-darker);
}

.node-info:hover {
    background-color: var(--background);
    color: var(--text-dark);
}

.node-title {
    margin: auto;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 3px;
}

.open-ico-parent {
    position: relative;
    width: 15px;
    height: 15px;
    margin: auto;
    margin-left: 0px;
    margin-right: 5px;
}

.open-ico {
    width: 15px;
    height: auto;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.file-icon {
    width: 15px;
    height: 15px;
    margin: auto;
    margin-left: 0px;
    margin-right: 5px;
    margin-bottom: 6.5px;
}

</style>

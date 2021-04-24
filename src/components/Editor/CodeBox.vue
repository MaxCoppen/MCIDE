<template>

    <div class="code-box flex-grow-1">
        <div class="d-flex flex-column w-100 h-100">
            <monaco ref="editor" @onUpdate="onUpdate" @openFile="$emit('openFile')" @saveFile="$emit('saveFile')" :filelang="filelang" :editorTheme="editorTheme" />
        </div>
    </div>

</template>

<script>
import monaco from './Monaco/MonacoEditor'

export default {
    components: { monaco },

    props: {
        filelang: { type: String, default: 'text' },
        editorTheme: { type: String, default: 'dark' },
        file: Object
    },

    watch: {
        file() {
            if (this.file)
                this.$refs.editor.setContent(this.file.content)
            else
                this.$refs.editor.hideEditor()
        }
    },

    data() {
        return {
            filepath: '',
            filename: ''
        }
    },

    methods: {
        onUpdate(model) {
            this.$emit('onUpdate', model)
        }
    }
}

</script>

<style>

.code-box {
    background-color: var(--background);
    color: var(--text-dark);

    width: 100%;
    height: 100%;
}

</style>

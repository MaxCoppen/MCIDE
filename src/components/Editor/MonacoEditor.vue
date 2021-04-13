<template>

<div ref="container" class="container editor flex-grow-1">
  <div ref="editor" class="monaco" :style="{ opacity: open ? 1 : 0 }"></div>
</div>

</template>

<script>
const { remote } = require('electron')
import * as monaco from 'monaco-editor';

import './themes';

export default {
  data() {
    return {
      open: false
    }
  },

  mounted() {
    const el = this.$refs.editor;

    this.editor = monaco.editor.create(el, {
      value: '',
      language: 'javascript',
      theme: 'mcide-dark',
      fontFamily: 'IBM Plex Mono',
      scrollBeyondLastLine: false
    });

    const refresh = () => 
    { 
      setTimeout(() => { 
        this.editor.layout({ width: 0, height: 0 }); 
        this.editor.layout() 
      }, 100)
    }

    remote.getCurrentWindow().on('resized', refresh)
    remote.getCurrentWindow().on('maximize', refresh)
    remote.getCurrentWindow().on('unmaximize', refresh)

    this.editor.getModel().onDidChangeContent(() => {
      this.$emit('onUpdate', this.editor.getModel().getLineCount())
    });
  },

  methods: {
    setContent(content) {
      this.open = true
      this.editor.getModel().setValue(content)
      this.$emit('onUpdate', this.editor.getModel().getLineCount())
    }
  }
};
</script>

<style>

.monaco {
  text-align: left;
  width: 100%; 
  height: 100%;
}

.editor {
  resize: vertical;
  height: 100%;
  max-width: 100vw !important;
  width: 100% !important;
  margin: 0 !important;
}

</style>
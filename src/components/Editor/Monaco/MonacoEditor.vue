<template>

<div ref="container" class="container editor flex-grow-1">
  <div v-show="open" ref="editor" class="monaco"></div>
</div>

</template>

<script>
const { remote } = require('electron')
import * as monaco from 'monaco-editor';

import './themes';
import shortcuts from './shortcuts';

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
      language: 'c',
      theme: 'mcide-dark',
      fontFamily: 'IBM Plex Mono',
      tabSize: 4,
      scrollBeyondLastLine: false
    });

    this.editor.addAction(shortcuts.SaveFile(() => this.$emit('saveFile')))
    this.editor.addAction(shortcuts.OpenFile(() => this.$emit('openFile')))

    const refresh = () => 
    { 
      setTimeout(() => { 
        this.editor.layout({ width: 0, height: 0 }); 
        this.editor.layout() 
      }, 100)
    }

    setTimeout(() => monaco.editor.remeasureFonts(), 100)

    remote.getCurrentWindow().on('resized', refresh)
    remote.getCurrentWindow().on('maximize', refresh)
    remote.getCurrentWindow().on('unmaximize', refresh)

    this.editor.getModel().onDidChangeContent(() => {
      this.$emit('onUpdate', this.editor.getModel().getLineCount())
      refresh()
    });
  },

  methods: {
    setContent(content) {
      this.open = true
      this.editor.getModel().setValue(content)
      this.$emit('onUpdate', this.editor.getModel().getLineCount())
    },

    getValue() {
      return this.editor.getModel().getValue()
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
  padding: 0 !important;
  padding-bottom: 20px !important;
}

</style>
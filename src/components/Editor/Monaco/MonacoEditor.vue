<template>

<div ref="container" class="container editor flex-grow-1">
  <div v-show="open" ref="editor" class="monaco"></div>
</div>

</template>

<script>
const remote = require('@electron/remote')
import * as monaco from 'monaco-editor';

import './themes';
import shortcuts from './shortcuts';

export default {
  props: {
    filelang: { type: String, default: 'text' },
    editorTheme: { type: String, default: 'dark' }
  },

  data() {
    return {
      open: false
    }
  },

  mounted() {
    const el = this.$refs.editor;

    this.editor = monaco.editor.create(el, {
      value: '',
      language: this.filelang,
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
      this.$emit('onUpdate', this.editor.getModel())
      refresh()
    });
  },

  watch: {
    filelang() {
      const languages = {
        'js': 'javascript',
        'ts': 'typescript',
        'json': 'json',
        'html': 'html',
        'htm': 'html',
        'vue': 'html',
        'txt': 'text',
        'css': 'css',
        'c': 'c',
        'c++': 'cpp',
        'c#': 'csharp'
      }

      const ext = this.filelang.match(/([^.])+$/g)[0];

      monaco.editor.setModelLanguage(this.editor.getModel(), languages[ext])
    },

    editorTheme() {
      monaco.editor.setTheme('mcide-' + this.editorTheme);
    }
  },

  methods: {
    setContent(content) {
      console.log(content)
      if (content != null) {
        
        this.open = true
        this.editor.getModel().setValue(content)
        this.$emit('onUpdate', this.editor.getModel())
      } else {
        this.hideEditor()
      }
    },

    hideEditor() {
      this.open = false
      this.editor.getModel().setValue('')
      this.$emit('onUpdate', null)
    },

    getModel() {
      return this.editor.getModel()
    },

    getValue() {
      return this.editor.getModel().getValue()
    },

    commentSelection() {
      // Get the selection and create the range:
      const selection = this.editor.getSelection()
      const range = {
        startLineNumber: selection.startLineNumber, 
        startColumn: selection.startColumn, 
        endLineNumber: selection.endLineNumber, 
        endColumn: selection.endColumn,
      }

      // Get the selection text and comment it:
      const codeToComment = this.editor.getModel().getValueInRange(range)

      // Get the commented code:
      var commentedCode;
      if (this.filelang == 'html' || this.filelang == 'htm')
        commentedCode = '<!--' + codeToComment + '-->'
      else
        commentedCode = '/*' + codeToComment + '*/'

      // Execute the edits:
      this.editor.executeEdits('comment', [
        {
          range: range,
          text: commentedCode,
        },
      ])
    },

    uncommentSelection() {
      // Get the selection and create the range:
      const selection = this.editor.getSelection()
      const range = {
        startLineNumber: selection.startLineNumber, 
        startColumn: selection.startColumn, 
        endLineNumber: selection.endLineNumber, 
        endColumn: selection.endColumn,
      }

      // Get the selection text and comment it:
      const codeToUncomment = this.editor.getModel().getValueInRange(range)

      // Get the uncommented code:
      var uncommentedCode;
      if (this.filelang == 'html' || this.filelang == 'htm')
        uncommentedCode = codeToUncomment.replace(/<!--/, '').replace(/-->/, '')
      else
        uncommentedCode = codeToUncomment.replace(/\*\//, '').replace(/\/\*/, '')

      this.editor.executeEdits('comment', [
        {
          range: range,
          text: uncommentedCode,
        },
      ])
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
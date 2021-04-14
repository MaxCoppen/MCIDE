import * as monaco from 'monaco-editor';

monaco.editor.defineTheme('mcide-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '#333333', foreground: '#AAAAAA' }],
    colors: {
        'editor.foreground': '#FFFFFF',
        'editor.background': '#333333',
    }
});
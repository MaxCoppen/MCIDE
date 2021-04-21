import * as monaco from 'monaco-editor';

//const background_color = getComputedStyle(document.documentElement).getPropertyValue('--background')

monaco.editor.defineTheme('mcide-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '#333333', foreground: '#888888' }],
    colors: {
        'editor.foreground': '#00000000',
        'editor.background': '#00000000',
    }
});

monaco.editor.defineTheme('mcide-light', {
    base: 'vs',
    inherit: true,
    rules: [{ background: '#cccccc', foreground: '#555555' }],
    colors: {
        'editor.foreground': '#00000000',
        'editor.background': '#00000000',
    }
});
import * as monaco from 'monaco-editor';

// Save file shortcut [Ctrl + S]
const SaveFile = function(runfunction) {
    var action = {
        id: 'save-file',
        label: 'save-file',

        keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S
        ],

        run: runfunction
    };

    return action
}

// Open file shortcut [Ctrl + O]
const OpenFile = function(runfunction) {
    var action = {
        id: 'open-file',
        label: 'open-file',

        keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_O
        ],

        run: runfunction
    };

    return action
}

export default 
{ 
    SaveFile, 
    OpenFile 
}
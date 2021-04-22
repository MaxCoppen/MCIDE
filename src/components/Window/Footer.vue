<template>

<div class="footer">
    <div class="d-flex align-items-start flex-row h-100">

        <!-- Directory Information -->
        <div class="dir-info d-flex justify-content-start h-100">

            <i class="ico" data-feather="file"></i>
            <p class="txt monospace"> {{files}} </p>

            <i class="ico" data-feather="file-text"></i>
            <p class="txt monospace"> {{projectLength}} </p>

        </div>

        <!-- File Information -->
        <div class="d-flex justify-content-start h-100">

            <i class="ico" data-feather="code"></i>
            <p class="txt monospace"> {{fileLength}} </p>

            <i class="ico" data-feather="at-sign"></i>
            <p class="txt monospace"> {{shortFilePath}} </p>

        </div>

        <!-- Code Information -->
        <div class="d-flex justify-content-end flex-grow-1 h-100">

            <i class="ico" data-feather="command"></i>
            <p class="txt monospace"> {{codeLanguage}} </p>

            <i class="ico" data-feather="hash"></i>
            <p class="txt monospace"> {{editorVersion}} </p>

        </div>

    </div>
</div>

</template>

<script>
// Electron remote:
const remote = require('@electron/remote')
var window = remote.getCurrentWindow()

export default {
    props: {
        files: {
            type: Number,
            default: 0
        },
        projectLength: {
            type: Number,
            default: 0
        },

        fileLength: {
            type: Number,
            default: 0
        },
        filePath: {
            type: String,
            default: '-'
        },

        codeLanguage: {
            type: String,
            default: '-'
        },
        editorVersion: {
            type: String,
            default: '1.0.0'
        },
    },

    data() {
        return {
            shortFilePath: '-'
        }
    },

    mounted() {
        window.on('resize', () => { this.updateFilePath() })
    },

    methods: {
        updateFilePath() {
            const maxLength = (window.getSize()[0] - 400) / 10
            // Get the tokens.
            var tokens = this.filePath.split("\\")
            const totalLength = tokens.length
            // Take out the drive and filename:
            const drive = tokens[0]
            const filename = tokens[tokens.length - 1]
            // Splice out the drive and filename:
            tokens.splice(0, 1)
            tokens.splice(tokens.length - 1, 1)
            // Take remaining tokens:
            var currentLength = drive.length + filename.length
            var remainingTokens = []
            while(currentLength < maxLength && tokens.length > 0) {
                remainingTokens.push(tokens[0])
                currentLength += tokens[0].length
                tokens.splice(0, 1)
            }
            // Generate the path:
            var path;
            if (remainingTokens.length < totalLength - 2 && remainingTokens.length > 0)
                path = drive + '\\...\\' + remainingTokens.join('\\') + '\\' + filename
            else if (remainingTokens.length == 0)
                path = filename
            else
                path = drive + '\\' + remainingTokens.join('\\') + '\\' + filename
            // Save the path.
            this.shortFilePath = path
        }
    },

    watch: {
        filePath() {
            this.updateFilePath()
        }
    }
}

</script>

<style scoped>

.footer {
    user-select: none;
    -webkit-user-select: none;

    background-color: var(--background-light);
    overflow: hidden;

    z-index: 3;

    position: fixed;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 20px;
}

.dir-info {
    width: calc(100vw / 4) !important;
    min-width: 150px;
    max-width: 350px;
}

.ico {
    color: var(--text-dark);
    height: 12px;
    width: 12px;
    margin: 4px 3px 0px 3px;
}

.txt {
    color: var(--text-dark);
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;

    padding-right: 5px;
    margin-top: 0.5px;

    width: auto;
}

</style>
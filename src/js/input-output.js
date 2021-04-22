const fs = require("fs")
const path = require("path")

const remote = require('@electron/remote')

// Read a directory.
const readDir = function(dirPath, arrayOfFiles) {
    var files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        
        // If folder then look inside of it.
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            // Push this folder and add a '/'.
            arrayOfFiles.push(path.join(dirPath.split('\\')[dirPath.split('\\').length - 1], "/", file + '/'))

            arrayOfFiles = readDir(dirPath + "/" + file, arrayOfFiles)
        } else {
            // Push this file.
            arrayOfFiles.push(path.join(dirPath.split('\\')[dirPath.split('\\').length - 1], "/", file))
        }
    })

    return arrayOfFiles
}

// Read a file.
async function readFile() {
    var readResult;

    await remote.dialog.showOpenDialog({ 
        properties: ['openFile']
    })
    .then(result => {
        if (result.canceled == false) {
            // Get the filepath and content:
            const filepath = result.filePaths[0]
            const filecontent = fs.readFileSync(result.filePaths[0], 'utf8');

            // Get the full filename.
            const fullname = result.filePaths[0].split('\\')[result.filePaths[0].split('\\').length - 1]

            // Get the filename and extension seperate:
            const filename = fullname.split('.').slice(0, -1).join('.')
            const extension = fullname.split('.')[fullname.split('.').length - 1].toLowerCase()

            // Save the results of the read.
            readResult = { filename, extension, filepath, filecontent }
        }
    })

    return readResult
}

export default { 
    readDir, 
    readFile 
}
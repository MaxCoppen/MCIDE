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
            arrayOfFiles.push(path.join(dirPath.split('\\')[dirPath.split('\\').length - 1], "/", file))

            arrayOfFiles = readDir(dirPath + "/" + file, arrayOfFiles)
        } else {
            // Push this file.
            arrayOfFiles.push(path.join(dirPath.split('\\')[dirPath.split('\\').length - 1], "/", file))
        }
    })

    return arrayOfFiles
}

// Read a file.
async function openFile() {
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

// Open a folder
async function openFolder() {
    var readResult;

    await remote.dialog.showOpenDialog({ 
        properties: ['openDirectory']
    })
    .then(result => {
        if (result.canceled == false) {
            // Get the name of the directory.
            const fullpath = result.filePaths[0]
            const dirname = fullpath.split('\\')[fullpath.split('\\').length - 1]

            // Get all the files in the directory.
            var files = readDir(result.filePaths[0], [])

            // Turn the files into nodes:
            var nodes = { name: dirname, path: fullpath, nodes: [] }
            files.forEach(path => {
                // Split the path into tokens.
                const tokens = path.split('\\')

                // If the path is longer then one token:
                if (tokens.length > 1) {
                    // Setup the home node and current path:
                    var node = nodes
                    var currentPath = fullpath
                    // Loop over each token and add the object if it doesn't exist:
                    for (let i = 1; i < tokens.length; i++) {
                        currentPath += '\\' + tokens[i]
                        if (!node.nodes.some(n => n.name == tokens[i]))
                            node.nodes.push({ name: tokens[i], path: currentPath, nodes: [] })
                        node = node.nodes.find(n => n.name == tokens[i])
                    }
                } else {
                    nodes[tokens[0]] = { name: tokens[0], path: tokens[0], nodes: [] }
                }
            })

            // Save the results of the read.
            readResult = { dirname, files, nodes }
        }
    })

    return readResult
}

export default { 
    readDir, 
    openFile,
    openFolder
}
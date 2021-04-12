const fs = require("fs")
const path = require("path")

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

export default readDir
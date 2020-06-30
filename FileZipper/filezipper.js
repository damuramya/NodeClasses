const fs = require("fs")
const path = require("path")
const archiver = require("archiver")

// Recursive function to get all files paths in the directory tree
/**
 * 
 * @param {String} dirPath Directory path
 * @param {Array} filespathArray Files path array
 */
const getAllFilesOfDicrectoryTree = (dirPath, filespathArray) => {
    const filelist = fs.readdirSync(dirPath)
    filespathArray = filespathArray || []

    filelist.forEach(function(file) {

        //Check whether the path is directory or file.
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            filespathArray = getAllFilesOfDicrectoryTree(path.join(dirPath, "/", file), filespathArray)
        } else {
            filespathArray.push(path.join(dirPath, "/", file))
        }
    })
    return filespathArray
}

// Zip all files of directory tree as output.zip
/**
 * 
 * @param {String} dirPath Directory path to be zipped
 */
const zipFiles = (dirPath, callback) => {
    const outputzipPath = path.join(dirPath, "/", "output.zip")
    const ws = fs.createWriteStream(outputzipPath)

    // Delete outpu.zip if already exists
    if (fs.existsSync(outputzipPath)) {
        fs.unlinkSync(outputzipPath)
    }
    const zipper = archiver("zip")

    // Set destination
    zipper.pipe(ws)

    // Get files path array from the directory tree
    const filespathArray = getAllFilesOfDicrectoryTree(dirPath)

    // Add files to the archiver
    filespathArray.forEach((filePath) => {
        zipper.file(filePath, { name: path.basename(filePath)})
    })

    //Register events     
    ws.on('close', () => {  
        console.log('zipped ' + zipper.pointer() + ' total bytes') 
    })

    zipper.on("error", (err) => {
        callback({success: false, error: err})
    }).on("finish", () => {
        callback({success: true, message: "Zipping is done successfully"})
    }).finalize()
}

module.exports = zipFiles
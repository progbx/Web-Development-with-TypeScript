const fsPromises = require("fs/promises");

async function checkFileExistance(filePath) {
    let fileExists = false;
    let fileEmpty = true;
    let readFileError = null;

    let fileContentString = "";
    let fileHandle = null;

    try {
        fileHandle = await fsPromises.open(filePath);
        fileExists = true;

        const fileContent = await fileHandle.readFile(); // Returns Promise<Buffer>
        fileContentString = fileContent.toString();
    } catch (error) {
        readFileError = error;
        console.log(error);
    } finally {
        if (fileHandle) {
            fileHandle.close();
        }
    }

    fileEmpty = !fileContentString || !fileContentString.trim();

    return {
        fileExists,
        fileEmpty,
        readFileError,
        fileContentString,
    };
}

module.exports = { checkFileExistance };

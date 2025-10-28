import fsPromises from "fs/promises";

export async function checkFileExistance(filePath: string) {
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


export async function readJsonFile(filePath: string) {
    const { fileExists, fileContentString } = await checkFileExistance(filePath);
    
    let isJSONFileValid = false;
    let fileJSON = {};
    
    try {
        fileJSON = JSON.parse(fileContentString);
        isJSONFileValid = true;
    } catch(error) {
        console.log(error);
    }

    return {
        fileExists,
        isJSONFileValid,
        fileContentString,
        fileJSON,
    }
}

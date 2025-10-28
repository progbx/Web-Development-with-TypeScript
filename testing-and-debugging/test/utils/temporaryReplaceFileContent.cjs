const fs = require("node:fs/promises");

async function temporaryReplaceFileContent(filePath, replacementFilePath) {
    let initialContent = null;
    let revertContentReplacement = async () => {};
    let replacementFilePathContent = await fs.readFile(replacementFilePath, {
        encoding: "utf-8",
    });

    try {
        initialContent = await fs.readFile(filePath, { encoding: "utf-8" });

        await fs.writeFile(filePath, replacementFilePathContent);

        revertContentReplacement = async () => {
            await fs.writeFile(filePath, initialContent);
        };
    } catch (err) {
        console.log(err);
    }

    return { revertContentReplacement };
}

module.exports = { temporaryReplaceFileContent };

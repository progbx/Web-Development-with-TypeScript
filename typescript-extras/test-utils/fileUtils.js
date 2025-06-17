import fsPromises from "fs/promises";

export async function importModuleWithIgnoredErrors(filePath) {
    let importedModule = null;
    try {
        importedModule = await import(filePath);
    } catch {}

    return importedModule;
}

export async function readTextFile(filePath, options = { encoding: 'utf8' }) {
    const fileString = await fsPromises.readFile(filePath, options);

    return fileString;
}


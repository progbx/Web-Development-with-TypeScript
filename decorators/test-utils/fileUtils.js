import fsPromises from "fs/promises";
import { parse } from "@typescript-eslint/typescript-estree";

export async function importModuleWithIgnoredErrors(filePath) {
    let importedModule = null;
    try {
        importedModule = await import(filePath);
    } catch {}

    return importedModule;
}

export const commonESLintConfig = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
};

export function mergeConfigWithCommon(baseConfig) {
    return Object.assign({}, commonESLintConfig, baseConfig);
}

export async function loadESTreeForFile(filePath) {
    let fileHandle = null;
    let fileContent = null;
    let fileContentString = null;

    try {
        fileHandle = await fsPromises.open(filePath);
        fileContent = await fileHandle.readFile(); // Returns Promise<Buffer>
        fileContentString = fileContent.toString();
    } catch(error) {
        console.error(`[loadESTreeForFile] load file: ${error}`);
    }

    const fileIsEmpty = !fileContentString || !fileContentString.trim();
    let fileESTree = null;
    
    try {
        fileESTree = parse(fileContent, {
            loc: true,
            range: true,
        });
    } catch {
        console.error(`[loadESTreeForFile] parse ESTree: ${error}`);
    };

    // Required by NodeJS API
    fileHandle?.close();

    return {
        fileContent,
        fileESTree,
        fileIsEmpty,
    };
}

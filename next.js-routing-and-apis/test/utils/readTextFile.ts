import { readFile } from "fs/promises";

export async function readTextFile(filePath: string) {
    let fileString: string = "";
    
    try {
        fileString = await readFile(filePath, { encoding: "utf8" });
    } catch {}

    return fileString;
}

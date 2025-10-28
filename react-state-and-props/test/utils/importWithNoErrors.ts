export async function importModuleWithIgnoredErrors(filePath: string) {
    let importedModule = null;

    try {
        importedModule = await import(filePath);
    } catch {}

    return importedModule;
}

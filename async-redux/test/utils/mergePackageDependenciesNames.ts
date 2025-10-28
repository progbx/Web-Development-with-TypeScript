export function mergePackageDependenciesNames(
    packageJsonParsed: null | Record<string, any>
) {
    const dependencies = packageJsonParsed?.dependencies || {};
    const devDependencies = packageJsonParsed?.devDependencies || {};

    const allDependenciesObject = Object.assign(
        {},
        dependencies,
        devDependencies
    );
    const allDependenciesNames = Object.keys(allDependenciesObject);

    return allDependenciesNames;
}

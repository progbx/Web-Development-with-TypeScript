import path from "path";
import { execSync } from "node:child_process";
import { rimrafSync } from "rimraf";

import {
    readJsonFile,
    mergePackageDependenciesNames,
} from "../test-utils/jsonUtils";
import { readTextFile } from "../test-utils/fileUtils";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("TypeScript Extras", () => {
    let projectRootPath;
    let packageJsonPath;
    let isPackageJsonFileValid = false;
    let packageJsonParsed;
    let allDependenciesNames;
    // We need this timeout, sometimes file reading takes time
    let fileReadingTimeout = 15000;

    beforeEach(async () => {
        projectRootPath = path.resolve(__dirname, "../");
        packageJsonPath = path.resolve(projectRootPath, "package.json");

        const packageJSONFileReadResult = await readJsonFile(packageJsonPath);
        isPackageJsonFileValid = packageJSONFileReadResult.isJSONFileValid;
        packageJsonParsed = packageJSONFileReadResult.fileJSON;

        allDependenciesNames = mergePackageDependenciesNames(packageJsonParsed);
    });

    it("package.json file should be valid", () => {
        expect(isPackageJsonFileValid).toBe(true);
    });

    describe("Code Transpilation With @babel/cli", () => {
        let allScriptDependeciesAreIncluded;
        let scriptName;

        let babelrcFileReadResult;
        let babelrcJsonParsed;

        let resultFilePath;

        beforeEach(async () => {
            resultFilePath = path.resolve(projectRootPath, "dist", "index.js");
            const babelrcFilePath = path.resolve(
                projectRootPath,
                ".babelrc.json"
            );
            babelrcFileReadResult = await readJsonFile(babelrcFilePath);
            babelrcJsonParsed = babelrcFileReadResult.fileJSON;

            const expectedDependeciesList = [
                "@babel/core",
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/cli",
            ];
            scriptName = "babel:transpile";

            allScriptDependeciesAreIncluded = expectedDependeciesList.every(
                (name) => allDependenciesNames.includes(name)
            );
        });

        it("all dependencies should be saved", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
        });

        it("should have a 'babel:transpile' script", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
            expect(!!packageJsonParsed.scripts[scriptName]).toBe(true);
        });

        it("'.babelrc.json' file should exist and be valid", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
            expect(babelrcFileReadResult.fileExists).toBe(true);
            expect(babelrcFileReadResult.isJSONFileValid).toBe(true);

            // Check If presets are set
            expect(
                babelrcJsonParsed.presets.includes("@babel/preset-env")
            ).toBe(true);
            expect(
                babelrcJsonParsed.presets.includes("@babel/preset-typescript")
            ).toBe(true);
        });

        it(
            "script should generate an `dist/index.js` file",
            async () => {
                rimrafSync(resultFilePath);
                execSync(`npm run ${scriptName}`, {
                    cwd: projectRootPath,
                });

                const resultFileContent = await readTextFile(resultFilePath);

                expect(allScriptDependeciesAreIncluded).toBe(true);
                expect(!!resultFileContent).toBe(true);
            },
            fileReadingTimeout
        );
    });

    describe("Declaration files generation with tsc(TypeScript)", () => {
        let allScriptDependeciesAreIncluded;
        let scriptName;

        let tsConfigReadResult;
        let tsConfigJsonParsed;

        let resultFilePath;

        beforeEach(async () => {
            resultFilePath = path.resolve(
                projectRootPath,
                "dist",
                "index.d.ts"
            );
            const tsConfigFilePath = path.resolve(
                projectRootPath,
                "tsconfig.json"
            );
            tsConfigReadResult = await readJsonFile(tsConfigFilePath);
            tsConfigJsonParsed = tsConfigReadResult.fileJSON;

            const expectedDependeciesList = ["typescript"];
            scriptName = "ts:declaration";

            allScriptDependeciesAreIncluded = expectedDependeciesList.every(
                (name) => allDependenciesNames.includes(name)
            );
        });

        it("all dependencies should be saved", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
        });

        it("should have a 'ts:declaration' script", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
            expect(!!packageJsonParsed.scripts[scriptName]).toBe(true);
        });

        it("'tsconfig.json' file should exist and be valid", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
            expect(tsConfigReadResult.fileExists).toBe(true);
            expect(tsConfigReadResult.isJSONFileValid).toBe(true);
        });

        it(
            "script should generate an `dist/index.d.ts` file",
            async () => {
                rimrafSync(resultFilePath);
                execSync(`npm run ${scriptName}`, {
                    cwd: projectRootPath,
                });

                const resultFileContent = await readTextFile(resultFilePath);

                expect(allScriptDependeciesAreIncluded).toBe(true);
                expect(!!resultFileContent).toBe(true);
            },
            fileReadingTimeout
        );

        it("'tsconfig.json' file should include expected rules", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
            expect(tsConfigJsonParsed.compilerOptions).toEqual(
                expect.objectContaining({
                    strict: true,
                    forceConsistentCasingInFileNames: true,
                    strictFunctionTypes: true,
                    emitDeclarationOnly: true,
                })
            );
        });
    });

    describe("Linting Code with ESLint", () => {
        let allScriptDependeciesAreIncluded;
        let scriptName;

        beforeEach(async () => {
            const expectedDependeciesList = [
                "eslint",
                "typescript",
                "typescript-eslint",
            ];
            scriptName = "lint";

            allScriptDependeciesAreIncluded = expectedDependeciesList.every(
                (name) => allDependenciesNames.includes(name)
            );
        });

        it("all dependencies should be saved", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
        });

        it("should have a 'lint' script", () => {
            expect(allScriptDependeciesAreIncluded).toBe(true);
            expect(!!packageJsonParsed.scripts[scriptName]).toBe(true);
        });

        it("script should run 'eslint' and fix issues", async () => {
            execSync(`npm run ${scriptName}`, {
                cwd: projectRootPath,
            });

            const scriptValue = packageJsonParsed.scripts[scriptName];

            expect(scriptValue.includes("eslint")).toBe(true);
            expect(allScriptDependeciesAreIncluded).toBe(true);
        });
    });
});

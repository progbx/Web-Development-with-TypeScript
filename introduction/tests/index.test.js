import fsPromises from "fs/promises";
import path from "path";
import stripJSONComments from "./strip-json-comments.js";

describe("Introduction", () => {
    let packageJSONPath;
    let packageJSON;
    let scripts;

    let tsconfigJSONPath;
    let tsconfigJSON;
    let isErrorWhenReadTSConfigJSON;

    beforeEach(async () => {
        packageJSONPath = path.resolve(__dirname, "..", "package.json");
        tsconfigJSONPath = path.resolve(__dirname, "..", "tsconfig.json");

        // Read package.json file
        const packageJSONReadResult = await readJSONFile(packageJSONPath);
        packageJSON = packageJSONReadResult.parsedJSON;
        scripts = packageJSON.scripts || {};

        // Read tsconfig.json file
        const tsconfigJSONReadResult = await readJSONFile(tsconfigJSONPath);
        tsconfigJSON = tsconfigJSONReadResult.parsedJSON;
        isErrorWhenReadTSConfigJSON = tsconfigJSONReadResult.isErrorWhenRead;
    });

    async function readJSONFile(filePath) {
        let parsedJSON = {};
        let isErrorWhenRead = false;
        let JSONfileHandle;
        try {
            JSONfileHandle = await fsPromises.open(filePath);
            const parsedJSONFileBuffer = await JSONfileHandle.readFile();
            const parsedJSONFileString = parsedJSONFileBuffer.toString();

            parsedJSON = JSON.parse(stripJSONComments(parsedJSONFileString));
        } catch (error) {
            isErrorWhenRead = true;
            console.log(error);
        }

        if (JSONfileHandle) {
            JSONfileHandle.close();
        }

        return { parsedJSON, isErrorWhenRead };
    }

    it("TypeScript should be installed to 'devDependecies'", () => {
        const devDependencies = packageJSON?.devDependencies || {};

        expect(!!devDependencies["typescript"]).toBe(true);
    });

    describe("tsconfig.json", () => {
        it("should exist and should be a valid JSON", () => {
            expect(isErrorWhenReadTSConfigJSON).toBe(false);
        });

        describe("'compilerOptions'", () => {
            let compilerOptions;

            beforeEach(() => {
                compilerOptions = tsconfigJSON?.compilerOptions || {};
            });

            it("should target to 'ES2015'", () => {
                expect(compilerOptions.target).toBe("ES2015");
            });

            it("should use 'ESNext' module", () => {
                expect(compilerOptions.module).toBe("ESNext");
            });

            it("should allow JS", () => {
                expect(compilerOptions.allowJs).toBe(true);
            });

            it("should set 'strict' property to true", () => {
                expect(compilerOptions.strict).toBe(true);
            });

            it("should set 'forceConsistentCasingInFileNames' property to true", () => {
                expect(compilerOptions.forceConsistentCasingInFileNames).toBe(
                    true
                );
            });

            it("should set 'strictFunctionTypes' property to true", () => {
                expect(compilerOptions.strictFunctionTypes).toBe(true);
            });

            it("should set 'noUnusedLocals' property to true", () => {
                expect(compilerOptions.noUnusedLocals).toBe(true);
            });

            it("should set 'noUnusedParameters' property to true", () => {
                expect(compilerOptions.noUnusedParameters).toBe(true);
            });

            it("should set 'noImplicitReturns' property to true", () => {
                expect(compilerOptions.noImplicitReturns).toBe(true);
            });

            it("should set 'skipLibCheck' property to true", () => {
                expect(compilerOptions.skipLibCheck).toBe(true);
            });
        });

        it("should include 'src' folder", () => {
            expect(tsconfigJSON.include).toBeDefined();
            expect(tsconfigJSON.include?.includes("src")).toBe(true);
        });
    });

    describe("'src/index.ts'", () => {
        let indexTSFileContent;
        let indexTSFilePath;
        let indexTSFileHandle;

        let isErrorWhenReadingIndexTS;

        beforeEach(async () => {
            indexTSFilePath = path.resolve(__dirname, "..", "src", "index.ts");
            isErrorWhenReadingIndexTS = false;

            // Read src/index.ts file
            try {
                indexTSFileHandle = await fsPromises.open(indexTSFilePath);
                indexTSFileContent = await indexTSFileHandle.readFile(); // Returns Promise<Buffer>
            } catch (error) {
                isErrorWhenReadingIndexTS = true;
                console.log(error);
            }

            if (indexTSFileHandle) {
                indexTSFileHandle?.close();
            }
        });

        it("should be created", () => {
            expect(isErrorWhenReadingIndexTS).toBe(false);
        });

        describe("console.log('Hello, world!')", () => {
            let consoleLogMock;
            let realConsole;

            beforeEach(() => {
                consoleLogMock = jest.fn();
                realConsole = global.console;
                global.console = {
                    log: consoleLogMock,
                };
            });

            afterEach(() => {
                global.console = realConsole;
            });

            it("should have console.log call inside", async () => {
                await import("../src/index.ts");

                expect(consoleLogMock).toHaveBeenCalledWith("Hello, world!");
            });
        });
    });

    describe("'compile' script", () => {
        it("should exist and use 'tsc'", () => {
            const actualScript = scripts.compile || "";

            expect(actualScript.trim()).toBe("tsc");
        });

        describe("'dist/index.js' file", () => {
            let indexJSFilePath;
            let indexJSFileHandle;

            let isErrorWhenReadingIndexJS;

            beforeEach(async () => {
                indexJSFilePath = path.resolve(
                    __dirname,
                    "..",
                    "dist",
                    "index.js"
                );
                isErrorWhenReadingIndexJS = false;

                // Read src/index.ts file
                try {
                    indexJSFileHandle = await fsPromises.open(indexJSFilePath);
                    await indexJSFileHandle.readFile(); // Returns Promise<Buffer>
                } catch (error) {
                    isErrorWhenReadingIndexJS = true;
                    console.log(error);
                }

                if (indexJSFileHandle) {
                    indexJSFileHandle?.close();
                }
            });

            it(`should be generated and comitted by running NPM script \n (DON'T FORGET TO RUN 'npm run compile' and COMMIT 'dist' folder)`, () => {
                expect(isErrorWhenReadingIndexJS).toBe(false);
            });

            describe("generated code execution", () => {
                let consoleLogMock;
                let realConsole;

                beforeEach(() => {
                    consoleLogMock = jest.fn();
                    realConsole = global.console;
                    global.console = {
                        log: consoleLogMock,
                    };
                });

                afterEach(() => {
                    global.console = realConsole;
                });

                it("should be executable", async () => {
                    await import("../dist/index.js");

                    expect(consoleLogMock).toHaveBeenCalledWith(
                        "Hello, world!"
                    );
                });
            });
        });
    });

    describe("eslint", () => {
        it("'@typescript-eslint/eslint-plugin' should be installed to 'devDependecies'", () => {
            const devDependencies = packageJSON?.devDependencies || {};

            expect(!!devDependencies["@typescript-eslint/eslint-plugin"]).toBe(
                true
            );
        });

        it("'@typescript-eslint/parser' should be installed to 'devDependecies'", () => {
            const devDependencies = packageJSON?.devDependencies || {};

            expect(!!devDependencies["@typescript-eslint/parser"]).toBe(true);
        });

        it("'eslint' should be installed to 'devDependecies'", () => {
            const devDependencies = packageJSON?.devDependencies || {};

            expect(!!devDependencies["eslint"]).toBe(true);
        });

        it("'.eslintrc.cjs' file should be with expected content", async () => {
            const result = await import("../.eslintrc.cjs");
            const includesESLintRecommended =
                result.extends.includes("eslint:recommended");
            const includesTypeScriptESLintRecommended = result.extends.includes(
                "plugin:@typescript-eslint/recommended"
            );

            expect(
                includesESLintRecommended && includesTypeScriptESLintRecommended
            ).toBe(true);
            expect(result).toEqual(
                expect.objectContaining({
                    parser: "@typescript-eslint/parser",
                    plugins: ["@typescript-eslint"],
                    root: true,
                })
            );
        });

        it("'lint' script should be created", () => {
            const actualScript = scripts.lint || "";

            expect(actualScript.trim()).toBe("eslint ./src/index.ts");
        });
    });
});

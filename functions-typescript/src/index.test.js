import fsPromises from "fs/promises";
import path from "path";
import { ESLint } from "eslint";

import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { getRootLevelEntityByName } from "../test-utils/entityUtils";
import { tsCompile } from "../test-utils/tsCompile";
import {
    checkMethodParamsType,
    checkArrayParamsType,
} from "../test-utils/methodUtils";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("Functions", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let fileHandle;
    let commonESLintConfig;
    let taskSolutionIsEmpty;

    let add;
    let concatenate;
    let printInfo;
    let sumAll;

    beforeEach(async () => {
        filePath = path.resolve(__dirname, "index.ts");

        fileHandle = await fsPromises.open(filePath);
        fileContent = await fileHandle.readFile(); // Returns Promise<Buffer>
        const fileContentString = fileContent.toString();
        taskSolutionIsEmpty = !fileContentString || !fileContentString.trim();
        fileESTree = parse(fileContent, {
            loc: true,
            range: true,
        });

        commonESLintConfig = {
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
        };

        const indexModule = await import("./index");

        add = indexModule.add;
        concatenate = indexModule.concatenate;
        printInfo = indexModule.printInfo;
        sumAll = indexModule.sumAll;
    });

    afterEach(() => {
        // Required by NodeJS API
        fileHandle.close();
    });

    function mergeConfigWithCommon(baseConfig) {
        return Object.assign({}, commonESLintConfig, baseConfig);
    }

    it("should not have TypeScript errors or warnings", () => {
        const diagnostics = tsCompile([filePath], fileContent);

        expect(taskSolutionIsEmpty).toBe(false);
        expect(diagnostics).toEqual("");
    });

    it("should not use explicit 'any'", async () => {
        const noExplicitAny = "@typescript-eslint/no-explicit-any";

        const rules = [noExplicitAny];

        const baseConfig = mergeConfigWithCommon({
            rules: {
                [noExplicitAny]: "error",
            },
        });

        const eslint = new ESLint({ baseConfig });

        const lintResult = await eslint.lintFiles(filePath);

        const allMessages = lintResult[0].messages;
        const errorMessages = allMessages.filter((message) =>
            rules.includes(message.ruleId)
        );

        if (errorMessages.length > 0) {
            console.error(errorMessages);
        }

        expect(taskSolutionIsEmpty).toBe(false);
        expect(errorMessages.length === 0).toBe(true);
    });

    describe("add", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "add",
                identifierPropKey: "id",
            });
        });

        it("should be a function declaration", () => {
            expect(functionTestEntity.type).toBe(
                AST_NODE_TYPES.FunctionDeclaration
            );
        });

        it("should return number type value", () => {
            expect(functionTestEntity.returnType.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(functionTestEntity.returnType.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );
        });

        it("should expect two parameters", () => {
            const params = functionTestEntity.params;

            expect(params.length).toBe(2);
        });

        it("should expect first parameter to be number", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    0,
                    AST_NODE_TYPES.TSNumberKeyword
                )
            ).toBe(true);
        });

        it("should expect second parameter to be number", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    1,
                    AST_NODE_TYPES.TSNumberKeyword
                )
            ).toBe(true);
        });

        it("should add two numbers: 5 and 3", () => {
            const actualValue = add(5, 3);

            expect(actualValue).toBe(8);
        });

        it("should add two numbers: 0 and 0", () => {
            const actualValue = add(0, 0);

            expect(actualValue).toBe(0);
        });

        it("should add a positive and a negative number: -5 and 5", () => {
            const actualValue = add(-5, 5);

            expect(actualValue).toBe(0);
        });

        it("should add a positive and a negative number: 10 and -3", () => {
            const actualValue = add(10, -3);

            expect(actualValue).toBe(7);
        });

        it("should add two positive numbers: 222 and 222", () => {
            const actualValue = add(222, 222);

            expect(actualValue).toBe(444);
        });
    });

    describe("concatenate", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "concatenate",
                identifierPropKey: "id",
            });
        });

        it("should be a function declaration", () => {
            expect(functionTestEntity.type).toBe(
                AST_NODE_TYPES.FunctionDeclaration
            );
        });

        it("should return string type value", () => {
            expect(functionTestEntity.returnType.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(functionTestEntity.returnType.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });

        it("should expect two parameters", () => {
            const params = functionTestEntity.params;

            expect(params.length).toBe(2);
        });

        it("should expect first parameter to be string", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    0,
                    AST_NODE_TYPES.TSStringKeyword
                )
            ).toBe(true);
        });

        it("should expect second parameter to be string", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    1,
                    AST_NODE_TYPES.TSStringKeyword
                )
            ).toBe(true);
        });

        it('should concatenate two strings: "Hello" and " TypeScript"', () => {
            const actualValue = concatenate("Hello", " TypeScript");

            expect(actualValue).toBe("Hello TypeScript");
        });

        it('should concatenate an empty string and "Is it working?"', () => {
            const actualValue = concatenate("", "Is it working?");

            expect(actualValue).toBe("Is it working?");
        });

        it('should concatenate "Programming" and " is fun!"', () => {
            const actualValue = concatenate("Programming", " is fun!");

            expect(actualValue).toBe("Programming is fun!");
        });

        it('should concatenate "TypeScript" and " is powerful."', () => {
            const actualValue = concatenate("TypeScript", " is powerful.");

            expect(actualValue).toBe("TypeScript is powerful.");
        });

        it('should concatenate "This is" and " a test."', () => {
            const actualValue = concatenate("This is", " a test.");

            expect(actualValue).toBe("This is a test.");
        });
    });

    describe("sumAll", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "sumAll",
                identifierPropKey: "id",
            });
        });

        it("should be a function declaration", () => {
            expect(functionTestEntity.type).toBe(
                AST_NODE_TYPES.FunctionDeclaration
            );
        });

        it("should return number type value", () => {
            expect(functionTestEntity.returnType.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(functionTestEntity.returnType.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );
        });

        it("should expect one parameter", () => {
            const params = functionTestEntity.params;

            expect(params.length).toBe(1);
        });

        it("should expect first parameter to be rest parameter", () => {
            const params = functionTestEntity.params;

            expect(params[0].type).toBe(AST_NODE_TYPES.RestElement);
        });

        it("should expect first parameter to be Array type", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    0,
                    AST_NODE_TYPES.TSArrayType
                )
            ).toBe(true);
        });

        it("should expect first parameter to be Array of numbers type ", () => {
            expect(
                checkArrayParamsType(
                    functionTestEntity,
                    0,
                    AST_NODE_TYPES.TSNumberKeyword
                )
            ).toBe(true);
        });

        it("should sum all provided numbers: 1, 2, 3, 4, 5", () => {
            const actualValue = sumAll(1, 2, 3, 4, 5);

            expect(actualValue).toBe(15);
        });

        it("should sum all zeros: 0, 0, 0, 0", () => {
            const actualValue = sumAll(0, 0, 0, 0);

            expect(actualValue).toBe(0);
        });

        it("should sum all negative numbers: -1, -2, -3, -4, -5", () => {
            const actualValue = sumAll(-1, -2, -3, -4, -5);

            expect(actualValue).toBe(-15);
        });

        it("should sum two positive numbers: 10, 20", () => {
            const actualValue = sumAll(10, 20);

            expect(actualValue).toBe(30);
        });

        it("should sum a mix of positive and negative numbers: 2, -2, 3, -3", () => {
            const actualValue = sumAll(2, -2, 3, -3);

            expect(actualValue).toBe(0);
        });

        it("should return 0 when no items provided", () => {
            const actualValue = sumAll();

            expect(actualValue).toBe(0);
        });
    });

    describe("printInfo", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "printInfo",
                identifierPropKey: "id",
            });
        });

        it("should be a function declaration", () => {
            expect(functionTestEntity.type).toBe(
                AST_NODE_TYPES.FunctionDeclaration
            );
        });

        it("should return string type value", () => {
            expect(functionTestEntity.returnType.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(functionTestEntity.returnType.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });

        it("should expect three parameter", () => {
            const params = functionTestEntity.params;

            expect(params.length).toBe(3);
        });

        it("should expect first parameter to be string", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    0,
                    AST_NODE_TYPES.TSStringKeyword
                )
            ).toBe(true);
        });

        it("should expect second parameter to be number", () => {
            expect(
                checkMethodParamsType(
                    functionTestEntity,
                    1,
                    AST_NODE_TYPES.TSNumberKeyword
                )
            ).toBe(true);
        });

        it("should expect second parameter to be optional", () => {
            expect(functionTestEntity.params[1].optional).toBe(true);
        });

        it("should expect third parameter to have default value", () => {
            expect(functionTestEntity.params[2].type).toBe("AssignmentPattern");
        });

        it("should expect third parameter to be string", () => {
            expect(
                functionTestEntity.params[2]?.left?.typeAnnotation
                    ?.typeAnnotation?.type
            ).toBe(AST_NODE_TYPES.TSStringKeyword);
        });

        it('should print information about a person: "Name: John, Age: Unknown, Gender: Unknown"', () => {
            expect(printInfo("John")).toBe(
                "Name: John, Age: Unknown, Gender: Unknown"
            );
        });

        it('should print information about a person: "Name: Alice, Age: 25, Gender: Unknown"', () => {
            expect(printInfo("Alice", 25)).toBe(
                "Name: Alice, Age: 25, Gender: Unknown"
            );
        });

        it('should print information about a person: "Name: Bob, Age: 30, Gender: Male"', () => {
            expect(printInfo("Bob", 30, "Male")).toBe(
                "Name: Bob, Age: 30, Gender: Male"
            );
        });

        it('should print information about a person: "Name: Eve, Age: Unknown, Gender: Female"', () => {
            expect(printInfo("Eve", undefined, "Female")).toBe(
                "Name: Eve, Age: Unknown, Gender: Female"
            );
        });

        it('should print information about a person: "Name: Charlie, Age: 40, Gender: Non-Binary"', () => {
            expect(printInfo("Charlie", 40, "Non-Binary")).toBe(
                "Name: Charlie, Age: 40, Gender: Non-Binary"
            );
        });
    });
});

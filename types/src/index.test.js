import { AST_NODE_TYPES, parse } from "@typescript-eslint/typescript-estree";
import {
    checkUnionType,
    checkUnknownType,
    getFunctionParams,
    getRootLevelEntityByName,
} from "../test-utils/entityUtils";

import { ESLint } from "eslint";
import fsPromises from "fs/promises";
import path from "path";
import { tsCompile } from "../test-utils/tsCompile";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("Types", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let fileHandle;
    let commonESLintConfig;
    let taskSolutionIsEmpty;

    let handleInput;
    let validateUserInput;
    let logger;

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

        handleInput = indexModule.handleInput;
        validateUserInput = indexModule.validateUserInput;
        logger = indexModule.logger;
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

    describe("'handleInput' type", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "handleInput",
                identifierPropKey: "id",
            });
        });

        it("should expect one parameter", () => {
            const params = getFunctionParams(functionTestEntity);

            expect(params.length).toBe(1);
        });

        it("should return a string when input is a string", () => {
            const result = handleInput("hello");
            expect(typeof result).toBe("string");
            expect(result).toBe("hello - is a string!");
        });

        it("should return a number when input is a number", () => {
            const result = handleInput(5);
            expect(typeof result).toBe("number");
            expect(result).toBe(15);
        });

        it("should return a negate boolean when input is a boolean", () => {
            const result = handleInput(true);
            expect(typeof result).toBe("boolean");
            expect(result).toBe(false);
        });

        it('should return "Error" for an object input', () => {
            const result = handleInput({});
            expect(result).toBe("Error");
        });
    });

    describe("validateUserInput", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "validateUserInput",
                identifierPropKey: "id",
            });
        });

        it("should expect one parameter", () => {
            const params = getFunctionParams(functionTestEntity);

            expect(params.length).toBe(1);
        });

        it("should set `input` as a unknown type", () => {
            const params = getFunctionParams(functionTestEntity);
            expect(
                checkUnknownType({
                    entity: params[0],
                })
            ).toBe(true);
        });

        it('should return "Valid User Input" for valid input', () => {
            const validInput = {
                name: "John Doe",
                age: 25,
                subscribed: true,
            };
            const result = validateUserInput(validInput);
            expect(result).toBe("Valid User Input");
        });

        it('should return "Invalid input format" for input not being an object', () => {
            const result = validateUserInput("invalid input");
            expect(result).toBe("Invalid input format");
        });

        it('should return "Invalid input format" for missing or empty name', () => {
            const invalidInput = {
                age: 25,
                subscribed: true,
            };
            const result = validateUserInput(invalidInput);
            expect(result).toBe("Invalid input format");
        });

        it('should return "Invalid input format" for invalid age (not a number)', () => {
            const invalidInput = {
                name: "John Doe",
                age: "25",
                subscribed: true,
            };
            const result = validateUserInput(invalidInput);
            expect(result).toBe("Invalid input format");
        });

        it('should return "Invalid input format" for non-boolean subscribed value', () => {
            const invalidInput = {
                name: "John Doe",
                age: 25,
                subscribed: "true",
            };
            const result = validateUserInput(invalidInput);
            expect(result).toBe("Invalid input format");
        });
    });
    
    describe("logger", () => {
        it("should generate log entries with custom service configuration and use {serviceId}:{element array index} as keys", () => {
            const authLogger = logger(
                ["Wrong email", "Wrong password", "Success login"],
                {
                    serviceName: "auth_service",
                    serviceId: 3,
                }
            );

            expect(authLogger).toEqual({
                "3-0": "[auth_service] Wrong email",
                "3-1": "[auth_service] Wrong password",
                "3-2": "[auth_service] Success login",
            });
        });

        it("should generate log entries with default service configuration", () => {
            const defaultLogger = logger(["Info 1", "Info 2"]);

            expect(defaultLogger).toEqual({
                "1-0": "[global] Info 1",
                "1-1": "[global] Info 2",
            });
        });

        it("should handle empty messages array", () => {
            const emptyLogger = logger([], {
                serviceName: "custom_service",
                serviceId: 5,
            });

            expect(emptyLogger).toEqual({});
        });
        
        it("should log user events", () => {
            const result = logger(["User Event 1", "User Event 2"], {
                serviceName: "user",
                serviceId: 12,
            });
            
            const expected = {
                "12-0": "[user] User Event 1",
                "12-1": "[user] User Event 2",
            };
            
            expect(expected).toEqual(result);
        });
    });
});

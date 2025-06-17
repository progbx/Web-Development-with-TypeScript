import fsPromises from "fs/promises";
import path from "path";
import { ESLint } from "eslint";

import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { getRootLevelEntityByName } from "../test-utils/entityUtils";
import { tsCompile } from "../test-utils/tsCompile";
import {
    getMethodParams,
    checkMethodParamsType,
} from "../test-utils/methodUtils";

import { BankAccount, SavingsAccount, CheckingAccount } from "./index";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("Classes", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let fileHandle;
    let commonESLintConfig;
    let taskSolutionIsEmpty;

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

    describe("BankAccount", () => {
        let classTestEntity;

        beforeEach(() => {
            classTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "BankAccount",
                identifierPropKey: "id",
            });
        });

        it("should be a class declaration", () => {
            expect(classTestEntity.type).toBe(AST_NODE_TYPES.ClassDeclaration);
        });

        it("should be abstract", () => {
            expect(classTestEntity.abstract).toBe(true);
        });

        describe("private property '_balance'", () => {
            let propEntity;

            beforeEach(() => {
                propEntity = getRootLevelEntityByName({
                    parentEntity: classTestEntity.body,
                    entityName: "_balance",
                    identifierPropKey: "key",
                });
            });

            it("should have '_balance' property", () => {
                expect(propEntity.type).toBe(AST_NODE_TYPES.PropertyDefinition);
            });

            it("should not be static", () => {
                expect(propEntity.static).toBe(false);
            });

            it("should not be readonly", () => {
                expect(propEntity.readonly).toBe(false);
            });

            it("should be private", () => {
                expect(propEntity.accessibility).toBe("private");
            });

            it("should be a number type", () => {
                expect(propEntity.typeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSTypeAnnotation
                );
                expect(propEntity.typeAnnotation.typeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSNumberKeyword
                );
            });
        });

        describe("private property '_ownerName'", () => {
            let propEntity;

            beforeEach(() => {
                propEntity = getRootLevelEntityByName({
                    parentEntity: classTestEntity.body,
                    entityName: "_ownerName",
                    identifierPropKey: "key",
                });
            });

            it("should have '_ownerName' property", () => {
                expect(propEntity.type).toBe(AST_NODE_TYPES.PropertyDefinition);
            });

            it("should not be static", () => {
                expect(propEntity.static).toBe(false);
            });

            it("should be readonly", () => {
                expect(propEntity.readonly).toBe(true);
            });

            it("should be private", () => {
                expect(propEntity.accessibility).toBe("private");
            });

            it("should be a string type", () => {
                expect(propEntity.typeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSTypeAnnotation
                );
                expect(propEntity.typeAnnotation.typeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSStringKeyword
                );
            });
        });

        describe("abstract method 'calculateInterest'", () => {
            let methodEntity;

            beforeEach(() => {
                methodEntity = getRootLevelEntityByName({
                    parentEntity: classTestEntity.body,
                    entityName: "calculateInterest",
                    identifierPropKey: "key",
                });
            });

            it("should have asbtract 'calculateInterest' method", () => {
                expect(methodEntity.type).toBe(
                    AST_NODE_TYPES.TSAbstractMethodDefinition
                );
            });

            it("should return number type value", () => {
                expect(methodEntity.value.type).toBe(
                    AST_NODE_TYPES.TSEmptyBodyFunctionExpression
                );
                expect(methodEntity.value.returnType.typeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSNumberKeyword
                );
            });
        });

        describe("constructor, methods, properties", () => {
            let TestClass;
            let propEntity;

            let consoleLogMock;
            let realConsole;

            let testInstance1;
            let testInstance2;

            beforeAll(() => {
                TestClass = class extends BankAccount {};

                // Required to test totalAccounts count
                testInstance1 = new TestClass("owner1", 100);
                testInstance2 = new TestClass("owner2", 100);
                new TestClass("owner3", 100);
            });

            beforeEach(() => {
                propEntity = getRootLevelEntityByName({
                    parentEntity: classTestEntity.body,
                    entityName: "totalAccounts",
                    identifierPropKey: "key",
                });

                consoleLogMock = jest.fn();

                realConsole = global.console;
                global.console = {
                    log: consoleLogMock,
                };
            });

            afterEach(() => {
                global.console = realConsole;
            });

            describe("'totalAccounts'", () => {
                it("should should be getter", () => {
                    expect(propEntity.type).toBe(
                        AST_NODE_TYPES.MethodDefinition
                    );
                });

                it("should be static", () => {
                    expect(propEntity.static).toBe(true);
                });

                it("should return number type value", () => {
                    expect(propEntity.value.type).toBe(
                        AST_NODE_TYPES.FunctionExpression
                    );
                    expect(
                        propEntity.value.returnType.typeAnnotation.type
                    ).toBe(AST_NODE_TYPES.TSNumberKeyword);
                });

                it("should increment 'totalAccounts' amount", () => {
                    expect(TestClass.totalAccounts).toBe(3);
                });
            });

            describe("'displayTotalAccounts'", () => {
                let methodEntity;

                beforeEach(() => {
                    methodEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "displayTotalAccounts",
                        identifierPropKey: "key",
                    });
                });

                it("should be defined", () => {
                    expect(methodEntity.type).toBe(
                        AST_NODE_TYPES.MethodDefinition
                    );
                });

                it("should display in console totalAccounts", () => {
                    TestClass.displayTotalAccounts();

                    expect(consoleLogMock).toHaveBeenCalledWith(
                        "Total Accounts: 3"
                    );
                });
            });

            describe("'getBalance'", () => {
                let methodEntity;

                beforeEach(() => {
                    methodEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "getBalance",
                        identifierPropKey: "key",
                    });
                });

                it("should be defined", () => {
                    expect(methodEntity.type).toBe(
                        AST_NODE_TYPES.MethodDefinition
                    );
                });

                it("should return an initial balance of an account", () => {
                    const result = testInstance1.getBalance();

                    expect(result).toBe(100);
                });
            });

            describe("'deposit'", () => {
                let methodEntity;

                beforeEach(() => {
                    methodEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "deposit",
                        identifierPropKey: "key",
                    });
                });

                it("should be defined", () => {
                    expect(methodEntity.type).toBe(
                        AST_NODE_TYPES.MethodDefinition
                    );
                });

                it("should expect one number parameter", () => {
                    const params = getMethodParams(methodEntity);

                    expect(params.length).toBe(1);
                    expect(
                        checkMethodParamsType(
                            methodEntity,
                            0,
                            AST_NODE_TYPES.TSNumberKeyword
                        )
                    ).toBe(true);
                });

                it("should add money to balance", () => {
                    testInstance1.deposit(11);

                    const result = testInstance1.getBalance();

                    expect(result).toBe(111);
                });
            });

            describe("'withdraw'", () => {
                let methodEntity;

                beforeEach(() => {
                    methodEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "withdraw",
                        identifierPropKey: "key",
                    });
                });

                it("should be defined", () => {
                    expect(methodEntity.type).toBe(
                        AST_NODE_TYPES.MethodDefinition
                    );
                });

                it("should expect one number parameter", () => {
                    const params = getMethodParams(methodEntity);

                    expect(params.length).toBe(1);
                    expect(
                        checkMethodParamsType(
                            methodEntity,
                            0,
                            AST_NODE_TYPES.TSNumberKeyword
                        )
                    ).toBe(true);
                });

                it("should remove money to balance", () => {
                    testInstance2.withdraw(11);

                    const result = testInstance2.getBalance();

                    expect(result).toBe(89);
                });
            });
        });
    });

    describe("SavingsAccount", () => {
        let classTestEntity;

        beforeEach(() => {
            classTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "SavingsAccount",
                identifierPropKey: "id",
            });
        });

        it("should be a class declaration", () => {
            expect(classTestEntity.type).toBe(AST_NODE_TYPES.ClassDeclaration);
        });

        it("should extend 'BankAccount' class", () => {
            expect(classTestEntity.superClass.name).toBe("BankAccount");
        });

        describe("constructor, properties, method", () => {
            let testInstance1;

            beforeEach(() => {
                // Required to test totalAccounts count
                testInstance1 = new SavingsAccount("owner1", 100, 200);
            });

            describe("'calculateInterest' method", () => {
                it("should return calculated interest", () => {
                    const actualValue = testInstance1.calculateInterest();

                    expect(actualValue).toBe(20000);
                });
            });

            describe("private property '_interestRate'", () => {
                let propEntity;

                beforeEach(() => {
                    propEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "_interestRate",
                        identifierPropKey: "key",
                    });
                });

                it("should have '_interestRate' property", () => {
                    expect(propEntity.type).toBe(
                        AST_NODE_TYPES.PropertyDefinition
                    );
                });

                it("should be private", () => {
                    expect(propEntity.accessibility).toBe("private");
                });

                it("should be a number type", () => {
                    expect(propEntity.typeAnnotation.type).toBe(
                        AST_NODE_TYPES.TSTypeAnnotation
                    );
                    expect(propEntity.typeAnnotation.typeAnnotation.type).toBe(
                        AST_NODE_TYPES.TSNumberKeyword
                    );
                });
            });
        });
    });

    describe("CheckingAccount", () => {
        let classTestEntity;

        beforeEach(() => {
            classTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "CheckingAccount",
                identifierPropKey: "id",
            });
        });

        it("should be a class declaration", () => {
            expect(classTestEntity.type).toBe(AST_NODE_TYPES.ClassDeclaration);
        });

        it("should extend 'BankAccount' class", () => {
            expect(classTestEntity.superClass.name).toBe("BankAccount");
        });

        describe("constructor, properties, method", () => {
            let testInstance1;

            beforeEach(() => {
                // Required to test totalAccounts count
                testInstance1 = new CheckingAccount("owner1", 400, 200);
            });

            describe("'calculateInterest' method", () => {
                it("should return zero", () => {
                    const actualValue = testInstance1.calculateInterest();

                    expect(actualValue).toBe(0);
                });
            });

            describe("'withdraw' method", () => {
                let methodEntity;

                beforeEach(() => {
                    methodEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "withdraw",
                        identifierPropKey: "key",
                    });
                });

                describe("when withdraw amount does not exceed transaction limit", () => {
                    let withdrawAmount;

                    beforeEach(() => {
                        withdrawAmount = 200;
                    });

                    it("should expect one number parameter", () => {
                        const params = getMethodParams(methodEntity);

                        expect(params.length).toBe(1);
                        expect(
                            checkMethodParamsType(
                                methodEntity,
                                0,
                                AST_NODE_TYPES.TSNumberKeyword
                            )
                        ).toBe(true);
                    });

                    it("should withdraw money to balance", () => {
                        testInstance1.withdraw(withdrawAmount);

                        const result = testInstance1.getBalance();

                        expect(result).toBe(200);
                    });
                });

                describe("when withdraw amount exceeds transaction limit", () => {
                    let withdrawAmount;
                    let consoleLogMock;
                    let realConsole;

                    beforeEach(() => {
                        withdrawAmount = 201;
                        consoleLogMock = jest.fn();

                        realConsole = global.console;
                        global.console = {
                            log: consoleLogMock,
                        };
                    });

                    afterEach(() => {
                        global.console = realConsole;
                    });

                    it("should not withdraw money from balance and show a message", () => {
                        testInstance1.withdraw(withdrawAmount);

                        const result = testInstance1.getBalance();

                        expect(result).toBe(400);
                        expect(consoleLogMock).toHaveBeenCalledWith(
                            "Warning: Exceeds transaction limit of $200"
                        );
                    });
                });
            });

            describe("private property '_transactionLimit'", () => {
                let propEntity;

                beforeEach(() => {
                    propEntity = getRootLevelEntityByName({
                        parentEntity: classTestEntity.body,
                        entityName: "_transactionLimit",
                        identifierPropKey: "key",
                    });
                });

                it("should have '_transactionLimit' property", () => {
                    expect(propEntity.type).toBe(
                        AST_NODE_TYPES.PropertyDefinition
                    );
                });

                it("should be private", () => {
                    expect(propEntity.accessibility).toBe("private");
                });

                it("should be a number type", () => {
                    expect(propEntity.typeAnnotation.type).toBe(
                        AST_NODE_TYPES.TSTypeAnnotation
                    );
                    expect(propEntity.typeAnnotation.typeAnnotation.type).toBe(
                        AST_NODE_TYPES.TSNumberKeyword
                    );
                });
            });
        });
    });
});

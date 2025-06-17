import fsPromises from "fs/promises";
import path from "path";
import { ESLint } from "eslint";

import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import {
    getRootLevelEntityByName,
    getEntityFromList,
    isEntityFunction,
    getFunctionParams,
} from "../test-utils/entityUtils";
import { tsCompile } from "../test-utils/tsCompile";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("Interfaces", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let fileHandle;
    let commonESLintConfig;
    let taskSolutionIsEmpty;

    let Circle;
    let Square;
    let sortShapes;
    let FilledFlexibleCircle;

    let nameForIDrawShape;

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

        nameForIDrawShape = "IDrawShape";

        const indexModule = await import("./index");

        Circle = indexModule.Circle;
        Square = indexModule.Square;
        sortShapes = indexModule.sortShapes;
        FilledFlexibleCircle = indexModule.FilledFlexibleCircle;
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

    describe("interface `IDrawShape`", () => {
        let testEntity;

        beforeEach(() => {
            testEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: nameForIDrawShape,
                identifierPropKey: "id",
            });
        });

        it("should be an interface", () => {
            expect(testEntity.type).toBe(AST_NODE_TYPES.TSInterfaceDeclaration);
        });

        it("should set `name`, `size`, `color`properties", () => {
            const propertyEntities = testEntity.body.body;

            const nameEntity = getEntityFromList({
                entities: propertyEntities,
                identifierPropKey: "key",
                entityName: "name",
            });
            const sizeEntity = getEntityFromList({
                entities: propertyEntities,
                identifierPropKey: "key",
                entityName: "size",
            });
            const colorEntity = getEntityFromList({
                entities: propertyEntities,
                identifierPropKey: "key",
                entityName: "color",
            });

            expect(nameEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
            expect(sizeEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );

            expect(colorEntity.optional).toBe(true);
            expect(colorEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });

        describe("`calcualteSquare`", () => {
            let methodEntity;

            beforeEach(() => {
                methodEntity = getEntityFromList({
                    entities: testEntity.body.body,
                    identifierPropKey: "key",
                    entityName: "calculateSquare",
                });
            });

            it("should be a function", () => {
                expect(isEntityFunction(methodEntity)).toBe(true);
            });

            it("should not have parameters", () => {
                expect(methodEntity.params.length).toBe(0);
            });

            it("should return number type value", () => {
                expect(methodEntity.returnType.typeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSNumberKeyword
                );
            });
        });
    });

    describe("class `Circle`", () => {
        let classEntity;
        let instance1;
        let instance2;

        beforeEach(() => {
            classEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "Circle",
                identifierPropKey: "id",
            });

            instance1 = new Circle("MyCircle1", 7, "BADA55");
            instance2 = new Circle("MyCircle2", 2, "red");
        });

        it("should be a class", () => {
            expect(classEntity.type).toBe(AST_NODE_TYPES.ClassDeclaration);
        });

        it("should implement IDrawShape interface", () => {
            const hasInterface = classEntity.implements.some(
                (item) => item.expression.name === "IDrawShape"
            );

            expect(hasInterface).toBe(true);
        });

        it("should set properties from interface to new object isntance", () => {
            expect(instance1).toEqual(
                expect.objectContaining({
                    name: "MyCircle1",
                    size: 7,
                    color: "BADA55",
                })
            );

            expect(instance2).toEqual(
                expect.objectContaining({
                    name: "MyCircle2",
                    size: 2,
                    color: "red",
                })
            );
        });

        it("should calculate a square of a circle", () => {
            const result1 = instance1.calculateSquare();
            const result2 = instance2.calculateSquare();

            expect(Math.ceil(result1)).toEqual(154);
            expect(Math.ceil(result2)).toEqual(13);
        });
    });

    describe("class `Square`", () => {
        let classEntity;
        let instance1;
        let instance2;

        beforeEach(() => {
            classEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "Square",
                identifierPropKey: "id",
            });

            instance1 = new Square("MySquare1", 7, "green");
            instance2 = new Square("MySquare2", 2, "purple");
        });

        it("should be a class", () => {
            expect(classEntity.type).toBe(AST_NODE_TYPES.ClassDeclaration);
        });

        it("should implement IDrawShape interface", () => {
            const hasInterface = classEntity.implements.some(
                (item) => item.expression.name === "IDrawShape"
            );

            expect(hasInterface).toBe(true);
        });

        it("should set properties from interface", () => {
            expect(instance1).toEqual(
                expect.objectContaining({
                    name: "MySquare1",
                    size: 7,
                    color: "green",
                })
            );

            expect(instance2).toEqual(
                expect.objectContaining({
                    name: "MySquare2",
                    size: 2,
                    color: "purple",
                })
            );
        });

        it("should calculate a square", () => {
            const result1 = instance1.calculateSquare();
            const result2 = instance2.calculateSquare();

            expect(result1).toEqual(49);
            expect(result2).toEqual(4);
        });
    });

    describe("function `sortShapes`", () => {
        let shapes;
        let functionTestEntity;

        beforeEach(() => {
            shapes = [
                new Square("Shape2", 100),
                new Square("Shape3", 10),
                new Circle("Shape1", 1),
                new Circle("Shape4", 7),
            ];

            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "sortShapes",
                identifierPropKey: "id",
            });
        });

        it("should be a function", () => {
            expect(isEntityFunction(functionTestEntity)).toBe(true);
        });

        it("should expect a parameter of `IDrawShape` type", () => {
            const params = getFunctionParams(functionTestEntity);
            const param = params[0];

            const rootTypeAnnotation = param.typeAnnotation;
            const elementType = rootTypeAnnotation.typeAnnotation.elementType;

            expect(params.length).toBe(1);
            expect(
                rootTypeAnnotation.typeAnnotation.type ===
                    AST_NODE_TYPES.TSArrayType
            ).toBe(true);
            expect(elementType.typeName.name).toBe("IDrawShape");
        });

        it("should sort and map objects", () => {
            expect(sortShapes(shapes)).toEqual([
                "Shape1",
                "Shape3",
                "Shape4",
                "Shape2",
            ]);
        });
    });

    describe("interface `IPaintShape`", () => {
        let testInterfaceEntity;

        beforeEach(() => {
            testInterfaceEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "IPaintShape",
                identifierPropKey: "id",
            });
        });

        it("should be an interface", () => {
            expect(testInterfaceEntity.type).toBe(
                AST_NODE_TYPES.TSInterfaceDeclaration
            );
        });

        it("should extend IDrawShape", () => {
            const interfaceExtends = testInterfaceEntity.extends;
            const parentInterface = interfaceExtends[0];

            expect(interfaceExtends.length).toBe(1);
            expect(parentInterface.expression.name).toBe(nameForIDrawShape);
        });

        it("should make `color` property not optional", () => {
            const propertyEntities = testInterfaceEntity.body.body;

            const colorEntity = getEntityFromList({
                entities: propertyEntities,
                identifierPropKey: "key",
                entityName: "color",
            });

            expect(colorEntity.optional).toBe(false);
            expect(colorEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });
    });

    describe("interface `IChangeShape`", () => {
        let testInterfaceEntity;

        beforeEach(() => {
            testInterfaceEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "IChangeShape",
                identifierPropKey: "id",
            });
        });

        it("should be an interface", () => {
            expect(testInterfaceEntity.type).toBe(
                AST_NODE_TYPES.TSInterfaceDeclaration
            );
        });

        it("should extend `IDrawShape`", () => {
            const interfaceExtends = testInterfaceEntity.extends;
            const parentInterface = interfaceExtends[0];

            expect(interfaceExtends.length).toBe(1);
            expect(parentInterface.expression.name).toBe(nameForIDrawShape);
        });

        describe("method `increaseSize`", () => {
            let methodEntity;

            beforeEach(() => {
                methodEntity = getEntityFromList({
                    entities: testInterfaceEntity.body.body,
                    identifierPropKey: "key",
                    entityName: "increaseSize",
                });
            });

            it("should define it", () => {
                expect(isEntityFunction(methodEntity)).toBe(true);
            });

            it("should have correct parameter", () => {
                const params = methodEntity.params;
                const paramItem = params[0];
                const paramTypeAnnotation =
                    params[0].typeAnnotation.typeAnnotation;

                expect(paramTypeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSNumberKeyword
                );
                expect(paramItem.optional).toBe(false);
                expect(params.length).toBe(1);
            });
        });

        describe("method `decreaseSize`", () => {
            let methodEntity;

            beforeEach(() => {
                methodEntity = getEntityFromList({
                    entities: testInterfaceEntity.body.body,
                    identifierPropKey: "key",
                    entityName: "decreaseSize",
                });
            });

            it("should define it", () => {
                expect(isEntityFunction(methodEntity)).toBe(true);
            });

            it("should have correct parameter", () => {
                const params = methodEntity.params;
                const paramItem = params[0];
                const paramTypeAnnotation =
                    params[0].typeAnnotation.typeAnnotation;

                expect(paramTypeAnnotation.type).toBe(
                    AST_NODE_TYPES.TSNumberKeyword
                );
                expect(paramItem.optional).toBe(false);
                expect(params.length).toBe(1);
            });
        });
    });

    describe("class `FilledFlexibleCircle`", () => {
        let classEntity;
        let instance1;
        let instance2;

        beforeEach(() => {
            classEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "FilledFlexibleCircle",
                identifierPropKey: "id",
            });

            instance1 = new FilledFlexibleCircle("MyCircle1", 7, "BADA55");
            instance2 = new FilledFlexibleCircle("MyCircle2", 2, "red");
        });

        it("should be a class", () => {
            expect(classEntity.type).toBe(AST_NODE_TYPES.ClassDeclaration);
        });

        it("should implement IPaintShape interface", () => {
            const hasInterface = classEntity.implements.some(
                (item) => item.expression.name === "IPaintShape"
            );

            expect(hasInterface).toBe(true);
        });

        it("should implement IChangeShape interface", () => {
            const hasInterface = classEntity.implements.some(
                (item) => item.expression.name === "IChangeShape"
            );

            expect(hasInterface).toBe(true);
        });

        it("should set properties from interface to new object isntance", () => {
            expect(instance1).toEqual(
                expect.objectContaining({
                    name: "MyCircle1",
                    size: 7,
                    color: "BADA55",
                })
            );

            expect(instance2).toEqual(
                expect.objectContaining({
                    name: "MyCircle2",
                    size: 2,
                    color: "red",
                })
            );
        });

        it("should calculate a square of a circle", () => {
            const result1 = instance1.calculateSquare();
            const result2 = instance2.calculateSquare();

            expect(Math.ceil(result1)).toEqual(154);
            expect(Math.ceil(result2)).toEqual(13);
        });

        it("should increase size", () => {
            instance2.increaseSize(2);
            const result1 = instance2.calculateSquare();

            expect(Math.ceil(result1)).toEqual(51);
        });

        it("should decrease size", () => {
            instance1.decreaseSize(2);
            const result1 = instance1.calculateSquare();

            expect(Math.ceil(result1)).toEqual(39);
        });
    });
});

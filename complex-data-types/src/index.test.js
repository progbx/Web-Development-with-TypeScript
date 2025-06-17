import fsPromises from "fs/promises";
import path from "path";
import { ESLint } from "eslint";

import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import {
    getRootLevelEntityByName,
    getEntityFromList,
    checkUnionType,
    isEntityFunction,
    getFunctionParams,
    isCustomType,
    getFunctionEntityBody,
    isOmitType,
} from "../test-utils/entityUtils";
import { tsCompile } from "../test-utils/tsCompile";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("Complex Data Types", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let fileHandle;
    let commonESLintConfig;
    let taskSolutionIsEmpty;

    let getFormattedProductProperty;
    let groupProductsByState;

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

        getFormattedProductProperty = indexModule.getFormattedProductProperty;
        groupProductsByState = indexModule.groupProductsByState;
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

    describe("'Product' type", () => {
        let testEntity;

        beforeEach(() => {
            testEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "Product",
                identifierPropKey: "id",
            });
        });

        it("should be defined by type alias", () => {
            expect(testEntity.type).toBe(AST_NODE_TYPES.TSTypeAliasDeclaration);
        });

        it("should set `id`, `price`, `discount` to `number` type", () => {
            const idEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "id",
            });
            const priceEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "price",
            });
            const discountEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "discount",
            });

            expect(idEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );
            expect(priceEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );
            expect(discountEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );
        });

        it("should set `name` to `string` type", () => {
            const nameEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "name",
            });

            expect(nameEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });

        it("should set `limitForOnePurchase` as a union type", () => {
            const limitForOnePurchaseEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "limitForOnePurchase",
            });

            expect(
                checkUnionType({
                    entity: limitForOnePurchaseEntity,
                    unifiedTypesToCheck: [
                        [AST_NODE_TYPES.TSNumberKeyword],
                        [AST_NODE_TYPES.TSNullKeyword],
                    ],
                })
            ).toBe(true);
        });

        describe("`ProductState` type", () => {
            beforeEach(() => {
                testEntity = getRootLevelEntityByName({
                    parentEntity: fileESTree,
                    entityName: "ProductState",
                    identifierPropKey: "id",
                });
            });

            it("should be defined by type alias", () => {
                expect(testEntity.type).toBe(
                    AST_NODE_TYPES.TSTypeAliasDeclaration
                );
            });

            it("should be a union type", () => {
                expect(
                    checkUnionType({
                        entity: testEntity,
                        unifiedTypesToCheck: [
                            [AST_NODE_TYPES.Literal, "inStock"],
                            [AST_NODE_TYPES.Literal, "reservation"],
                        ],
                    })
                ).toBe(true);
            });
        });

        it("should set `state` to a `ProductState` type", () => {
            const stateEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "state",
            });

            expect(isCustomType(stateEntity, "ProductState")).toBe(true);
        });
    });

    describe("getFormattedProductProperty", () => {
        let functionTestEntity;
        let product;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "getFormattedProductProperty",
                identifierPropKey: "id",
            });

            product = {
                id: 1,
                name: "Cool Hat",
                price: 10.4,
                discount: 0,
                state: "inStock",
                limitForOnePurchase: null,
            };
        });

        it("should be a function", () => {
            expect(isEntityFunction(functionTestEntity)).toBe(true);
        });

        it("should expect 3 parameters", () => {
            const params = getFunctionParams(functionTestEntity);

            expect(params.length).toBe(3);
        });

        it("should expect the first parameter to be `Product`", () => {
            const params = getFunctionParams(functionTestEntity);
            expect(isCustomType(params[0], "Product")).toBe(true);
        });

        it("should expect the second parameter to be any key name from 'Product' type", () => {
            const params = getFunctionParams(functionTestEntity);
            const param = params[1];
            const rootTypeAnnotation = param.typeAnnotation;
            const customTypeTypeAnnotation =
                rootTypeAnnotation.typeAnnotation.typeAnnotation;

            expect(rootTypeAnnotation.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(rootTypeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSTypeOperator
            );
            expect(rootTypeAnnotation.typeAnnotation.operator).toBe("keyof");
            expect(customTypeTypeAnnotation.typeName.name).toBe("Product");
        });

        it("should expect the third parameter to be string", () => {
            const params = getFunctionParams(functionTestEntity);
            const param = params[2];

            expect(param.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(param.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });

        it("should return string type value", () => {
            const functionBody = getFunctionEntityBody(functionTestEntity);
            expect(functionBody.returnType.type).toBe(
                AST_NODE_TYPES.TSTypeAnnotation
            );
            expect(functionBody.returnType.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSStringKeyword
            );
        });

        it("should return formatted value for price", () => {
            expect(getFormattedProductProperty(product, "price", "€")).toBe(
                "10.40€"
            );
        });

        it("should return formatted value for discount", () => {
            expect(getFormattedProductProperty(product, "discount", "€")).toBe(
                "0.00€"
            );
        });

        it("should return an empty string for string property", () => {
            expect(getFormattedProductProperty(product, "name", "€")).toBe("");
        });

        it("should return an empty string for a union type property", () => {
            expect(
                getFormattedProductProperty(product, "limitForOnePurchase", "€")
            ).toBe("");
        });
    });

    describe("groupProductsByState", () => {
        let functionTestEntity;
        let products1;
        let products2;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "groupProductsByState",
                identifierPropKey: "id",
            });

            products1 = [
                {
                    id: 1,
                    name: "Cool Hat",
                    price: 10.4,
                    discount: 0,
                    state: "inStock",
                    limitForOnePurchase: null,
                },
                {
                    id: 2,
                    name: "Nice Bag",
                    price: 11,
                    discount: 2,
                    state: "reservation",
                    limitForOnePurchase: 5,
                },
                {
                    id: 3,
                    name: "Perfect Shoes",
                    price: 210,
                    discount: 2,
                    state: "reservation",
                    limitForOnePurchase: null,
                },
                {
                    id: 4,
                    name: "Normal Glasses",
                    price: 50,
                    discount: 20,
                    state: "inStock",
                    limitForOnePurchase: 7,
                },
            ];

            products2 = [
                {
                    id: 2,
                    name: "Nice Bag",
                    price: 11,
                    discount: 2,
                    state: "inStock",
                    limitForOnePurchase: 5,
                },
                {
                    id: 3,
                    name: "Perfect Shoes",
                    price: 210,
                    discount: 2,
                    state: "inStock",
                    limitForOnePurchase: null,
                },
                {
                    id: 4,
                    name: "Normal Glasses",
                    price: 50,
                    discount: 20,
                    state: "reservation",
                    limitForOnePurchase: 7,
                },
            ];
        });

        it("should be a function", () => {
            expect(isEntityFunction(functionTestEntity)).toBe(true);
        });

        it("should expect the first parameter to be an array of `Product`", () => {
            const params = getFunctionParams(functionTestEntity);
            const param = params[0];
            const rootTypeAnnotation = param.typeAnnotation;
            const elementType = rootTypeAnnotation.typeAnnotation.elementType;
            
            expect(params.length).toBe(1);
            expect(
                rootTypeAnnotation.typeAnnotation.type ===
                    AST_NODE_TYPES.TSArrayType
            ).toBe(true);
            expect(elementType.typeName.name).toBe("Product");
        });

        it("should return a `Record` with `state` properties used as keys and array of products as value", () => {
            const functionBody = getFunctionEntityBody(functionTestEntity);
            const rootTypeAnnotation = functionBody.returnType.typeAnnotation;
            // const elementType = rootTypeAnnotation.typeAnnotation.elementType;
            const recordParams = rootTypeAnnotation.typeArguments.params;
            const keyRecordParam = recordParams[0];
            const valueRecordParam = recordParams[1];

            // Check that it Record
            expect(rootTypeAnnotation.typeName.name).toBe("Record");

            // Check the first generic Type
            expect(keyRecordParam.type).toBe(AST_NODE_TYPES.TSTypeReference);
            expect(keyRecordParam.typeName.name).toBe("ProductState");

            // Check the second generic Type
            expect(valueRecordParam.type).toBe(AST_NODE_TYPES.TSArrayType);
            expect(valueRecordParam.elementType.typeName.name).toBe("Product");
        });

        it("should group by state", () => {
            const expectedResult1 = {
                inStock: [
                    {
                        id: 1,
                        name: "Cool Hat",
                        price: 10.4,
                        discount: 0,
                        state: "inStock",
                        limitForOnePurchase: null,
                    },
                    {
                        id: 4,
                        name: "Normal Glasses",
                        price: 50,
                        discount: 20,
                        state: "inStock",
                        limitForOnePurchase: 7,
                    },
                ],
                reservation: [
                    {
                        id: 2,
                        name: "Nice Bag",
                        price: 11,
                        discount: 2,
                        state: "reservation",
                        limitForOnePurchase: 5,
                    },
                    {
                        id: 3,
                        name: "Perfect Shoes",
                        price: 210,
                        discount: 2,
                        state: "reservation",
                        limitForOnePurchase: null,
                    },
                ],
            };
            const expectedResult2 = {
                inStock: [
                    {
                        id: 2,
                        name: "Nice Bag",
                        price: 11,
                        discount: 2,
                        state: "inStock",
                        limitForOnePurchase: 5,
                    },
                    {
                        id: 3,
                        name: "Perfect Shoes",
                        price: 210,
                        discount: 2,
                        state: "inStock",
                        limitForOnePurchase: null,
                    },
                    ,
                ],
                reservation: [
                    {
                        id: 4,
                        name: "Normal Glasses",
                        price: 50,
                        discount: 20,
                        state: "reservation",
                        limitForOnePurchase: 7,
                    },
                ],
            };

            // We need checking two different options, to be sure
            // student didn't hard-coded it
            expect(groupProductsByState(products1)).toEqual(expectedResult1);
            expect(groupProductsByState(products2)).toEqual(expectedResult2);
        });
    });

    describe("'ProductCore' and 'ProductUpdate'", () => {
        let productCoreTestEntity;
        let productUpdateTestEntity;

        beforeEach(() => {
            productCoreTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "ProductCore",
                identifierPropKey: "id",
            });

            productUpdateTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "ProductUpdate",
                identifierPropKey: "id",
            });
        });

        describe("ProductCore", () => {
            it("should be defined by type alias", () => {
                expect(productCoreTestEntity.type).toBe(
                    AST_NODE_TYPES.TSTypeAliasDeclaration
                );
            });
            
            it("should omit 'Product' type properties", () => {
                expect(
                    isOmitType({
                        expectedOmittedProperties: [
                            "limitForOnePurchase",
                            "state",
                            "discount",
                        ],
                        typeAnnotation: productCoreTestEntity.typeAnnotation,
                        omittedTypeName: "Product",
                    })
                ).toBe(true);
            });
        });

        describe("ProductUpdate", () => {
            it("should be defined by type alias", () => {
                expect(productUpdateTestEntity.type).toBe(
                    AST_NODE_TYPES.TSTypeAliasDeclaration
                );
            });

            it("should be based on 'Partial'", () => {
                const typeName =
                    productUpdateTestEntity.typeAnnotation.typeName.name;

                expect(typeName).toBe("Partial");
            });

            it("should omit 'Product' type properties", () => {
                const omitTypeAnnotation =
                    productUpdateTestEntity.typeAnnotation.typeArguments
                        .params[0];

                expect(
                    isOmitType({
                        expectedOmittedProperties: ["id"],
                        typeAnnotation: omitTypeAnnotation,
                        omittedTypeName: "Product",
                    })
                ).toBe(true);
            });
        });
    });

    describe("'User' type", () => {
        let testEntity;

        beforeEach(() => {
            testEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "User",
                identifierPropKey: "id",
            });
        });

        it("should be defined by type alias", () => {
            expect(testEntity.type).toBe(AST_NODE_TYPES.TSTypeAliasDeclaration);
        });

        it("should define 'id' property", () => {
            const idEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "id",
            });

            expect(idEntity.typeAnnotation.typeAnnotation.type).toBe(
                AST_NODE_TYPES.TSNumberKeyword
            );
        });

        it("should define 'name' property", () => {
            const nameEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "name",
            });

            const typeAnnotation = nameEntity.typeAnnotation.typeAnnotation;
            const typeAnnotationTypeName = typeAnnotation.typeName;
            const typeArgumentsParams = typeAnnotation.typeArguments.params;
            const typeArgumentItem = typeArgumentsParams[0];

            expect(typeAnnotationTypeName.name).toBe("Capitalize");
            expect(typeArgumentItem.type).toBe(AST_NODE_TYPES.TSStringKeyword);
        });

        it("should define 'login' property", () => {
            const loginEntity = getEntityFromList({
                entities: testEntity.typeAnnotation.members,
                identifierPropKey: "key",
                entityName: "login",
            });

            const typeAnnotation = loginEntity.typeAnnotation.typeAnnotation;
            const typeAnnotationTypeName = typeAnnotation.typeName;
            const typeArgumentsParams = typeAnnotation.typeArguments.params;
            const typeArgumentItem = typeArgumentsParams[0];

            expect(typeAnnotationTypeName.name).toBe("Lowercase");
            expect(typeArgumentItem.type).toBe(AST_NODE_TYPES.TSStringKeyword);
        });
    });
});

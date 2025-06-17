import fsPromises from "fs/promises";
import path from "path";
import { ESLint } from "eslint";

import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { tsCompile } from "../test-utils/tsCompile";

import {
    getRootLevelEntityByName,
    getEntityFromList,
    isEntityFunction,
    getRootLevelVariableByName,
    getVariableDeclarator,
} from "../test-utils/entityUtils";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

describe("Modules and Namespaces", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let fileHandle;
    let commonESLintConfig;
    let taskSolutionIsEmpty;
    let displayProducts;

    let FreshProduceNamespace;
    let BakedGoodsNamespace;
    let CannedGoodsNamespace;
    let DairyProductsNamespace;
    let PersonalCareNamespace;

    beforeEach(async () => {
        try {
            filePath = path.resolve(__dirname, "index.ts");

            fileHandle = await fsPromises.open(filePath);
            fileContent = await fileHandle.readFile(); // Returns Promise<Buffer>
            const fileContentString = fileContent.toString();
            taskSolutionIsEmpty =
                !fileContentString || !fileContentString.trim();
            fileESTree = parse(fileContent, {
                loc: true,
                range: true,
            });
        } catch {}

        commonESLintConfig = {
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
        };

        // Import All Modules
        const indexModule = await importModuleWithIgnoredErrors("./index");
        FreshProduceNamespace = await importModuleWithIgnoredErrors(
            "./supermarket/FreshProduce"
        );
        BakedGoodsNamespace = await importModuleWithIgnoredErrors(
            "./supermarket/BakedGoods"
        );
        CannedGoodsNamespace = await importModuleWithIgnoredErrors(
            "./supermarket/CannedGoods"
        );
        DairyProductsNamespace = await importModuleWithIgnoredErrors(
            "./supermarket/DairyProducts"
        );
        PersonalCareNamespace = await importModuleWithIgnoredErrors(
            "./supermarket/PersonalCare"
        );

        displayProducts = indexModule?.Goods?.displayProducts;
    });

    afterEach(() => {
        // Required by NodeJS API
        fileHandle?.close();
    });

    function mergeConfigWithCommon(baseConfig) {
        return Object.assign({}, commonESLintConfig, baseConfig);
    }

    async function importModuleWithIgnoredErrors(path) {
        let importedModule = null;
        try {
            importedModule = await import(path);
        } catch {}

        return importedModule;
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

    describe("Products", () => {
        describe("FreshProduce", () => {
            it("namespace exists", () => {
                // Check if the object representing the namespace has the required property
                expect("FreshProduce" in FreshProduceNamespace).toBeTruthy();
            });

            it("should create a FreshProduce product", () => {
                let apple = new FreshProduceNamespace.FreshProduce.Product(
                    "Apple",
                    0.5,
                    100,
                    new Date(2021, 12, 30)
                );
                expect(apple).toBeTruthy();
                expect(apple.name).toBe("Apple");
                expect(apple.price).toBe(0.5);
                expect(apple.weight).toBe(100);
                expect(apple.expirationDate).toEqual(new Date(2021, 12, 30));
            });
        });

        describe("BakedGoods", () => {
            it("namespace exists", () => {
                // Check if the object representing the namespace has the required property
                expect("BakedGoods" in BakedGoodsNamespace).toBeTruthy();
            });

            it("should create a BakedGoods product", () => {
                let bread = new BakedGoodsNamespace.BakedGoods.Product(
                    "Bread",
                    1,
                    500,
                    new Date(2021, 12, 31)
                );
                expect(bread).toBeTruthy();
                expect(bread.name).toBe("Bread");
                expect(bread.price).toBe(1);
                expect(bread.weight).toBe(500);
                expect(bread.expirationDate).toEqual(new Date(2021, 12, 31));
            });
        });

        describe("DairyProducts", () => {
            it("namespace exists", () => {
                // Check if the object representing the namespace has the required property
                expect("DairyProducts" in DairyProductsNamespace).toBeTruthy();
            });

            it("should create a DairyProducts product", () => {
                let milk = new DairyProductsNamespace.DairyProducts.Product(
                    "Milk",
                    2,
                    1000,
                    new Date(2022, 1, 10)
                );
                expect(milk).toBeTruthy();
                expect(milk.name).toBe("Milk");
                expect(milk.price).toBe(2);
                expect(milk.weight).toBe(1000);
                expect(milk.expirationDate).toEqual(new Date(2022, 1, 10));
            });
        });

        describe("CannedGoods", () => {
            it("namespace exists", () => {
                // Check if the object representing the namespace has the required property
                expect("CannedGoods" in CannedGoodsNamespace).toBeTruthy();
            });

            it("should create a CannedGoods product", () => {
                let milk = new CannedGoodsNamespace.CannedGoods.Product(
                    "Milk",
                    2,
                    1000,
                    new Date(2022, 1, 10)
                );
                expect(milk).toBeTruthy();
                expect(milk.name).toBe("Milk");
                expect(milk.price).toBe(2);
                expect(milk.weight).toBe(1000);
                expect(milk.expirationDate).toEqual(new Date(2022, 1, 10));
            });
        });

        describe("PersonalCare", () => {
            it("namespace exists", () => {
                // Check if the object representing the namespace has the required property
                expect("PersonalCare" in PersonalCareNamespace).toBeTruthy();
            });

            it("should create a PersonalCare product", () => {
                let soap = new PersonalCareNamespace.PersonalCare.Product(
                    "Soap",
                    1,
                    50,
                    new Date(2024, 12, 30)
                );
                expect(soap).toBeTruthy();
                expect(soap.name).toBe("Soap");
                expect(soap.price).toBe(1);
                expect(soap.weight).toBe(50);
                expect(soap.expirationDate).toEqual(new Date(2024, 12, 30));
            });
        });

        it("should create in index.ts the `apple`, `bread`, `milk`, `tuna`, `soap` variables", () => {
            let appleEntityDeclarator = getVariableDeclarator(
                getRootLevelVariableByName({
                    parentEntity: fileESTree,
                    entityName: "apple",
                })
            );

            let breadEntityDeclarator = getVariableDeclarator(
                getRootLevelVariableByName({
                    parentEntity: fileESTree,
                    entityName: "bread",
                })
            );

            let milkEntityDeclarator = getVariableDeclarator(
                getRootLevelVariableByName({
                    parentEntity: fileESTree,
                    entityName: "milk",
                })
            );

            let tunaEntityDeclarator = getVariableDeclarator(
                getRootLevelVariableByName({
                    parentEntity: fileESTree,
                    entityName: "tuna",
                })
            );

            let soapEntityDeclarator = getVariableDeclarator(
                getRootLevelVariableByName({
                    parentEntity: fileESTree,
                    entityName: "soap",
                })
            );

            // apple
            expect(appleEntityDeclarator.init.type).toBe(
                AST_NODE_TYPES.NewExpression
            );
            expect(appleEntityDeclarator.init.callee.object.name).toBe(
                "FreshProduce"
            );

            // bread
            expect(breadEntityDeclarator.init.type).toBe(
                AST_NODE_TYPES.NewExpression
            );
            expect(breadEntityDeclarator.init.callee.object.name).toBe(
                "BakedGoods"
            );

            // milk
            expect(milkEntityDeclarator.init.type).toBe(
                AST_NODE_TYPES.NewExpression
            );
            expect(milkEntityDeclarator.init.callee.object.name).toBe(
                "DairyProducts"
            );

            // tuna
            expect(tunaEntityDeclarator.init.type).toBe(
                AST_NODE_TYPES.NewExpression
            );
            expect(tunaEntityDeclarator.init.callee.object.name).toBe(
                "CannedGoods"
            );

            // soap
            expect(soapEntityDeclarator.init.type).toBe(
                AST_NODE_TYPES.NewExpression
            );
            expect(soapEntityDeclarator.init.callee.object.name).toBe(
                "PersonalCare"
            );
        });

        describe("Namespaces usage", () => {
            let consoleLogSpy;
            let classTestEntity;

            beforeAll(() => {
                consoleLogSpy = jest.spyOn(console, "log");
            });

            beforeEach(() => {
                classTestEntity = getRootLevelEntityByName({
                    parentEntity: fileESTree,
                    entityName: "Goods",
                    identifierPropKey: "id",
                });
            });

            afterEach(() => {
                consoleLogSpy.mockClear();
            });

            it("should define class Goods", () => {
                expect(classTestEntity.type).toBe(
                    AST_NODE_TYPES.ClassDeclaration
                );
            });

            it("should define displayProducts static method for class Goods", () => {
                let methodEntity = getEntityFromList({
                    entities: classTestEntity.body.body,
                    identifierPropKey: "key",
                    entityName: "displayProducts",
                });

                expect(isEntityFunction(methodEntity)).toBe(true);
                expect(methodEntity.value.params.length).toBe(1);
            });

            it("should show info about PersonalCare product", () => {
                let prod = new PersonalCareNamespace.PersonalCare.Product(
                    "Soap",
                    1,
                    50,
                    new Date(2024, 11, 30)
                );
                displayProducts(prod);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    "Product Soap, has price: 1, weight: 50, expiration date: 30.12.2024"
                );
            });

            it("should show info about FreshProduce product", () => {
                let prod = new FreshProduceNamespace.FreshProduce.Product(
                    "Apple",
                    0.5,
                    100,
                    new Date(2021, 11, 30)
                );
                displayProducts(prod);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    "Product Apple, has price: 0.5, weight: 100, expiration date: 30.12.2021"
                );
            });

            it("should show info about BakedGoods product", () => {
                let prod = new BakedGoodsNamespace.BakedGoods.Product(
                    "Bread",
                    1,
                    500,
                    new Date(2021, 11, 31)
                );
                displayProducts(prod);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    "Product Bread, has price: 1, weight: 500, expiration date: 31.12.2021"
                );
            });

            it("should show info about DairyProducts product", () => {
                let prod = new DairyProductsNamespace.DairyProducts.Product(
                    "Milk",
                    2,
                    1000,
                    new Date(2022, 0, 10)
                );
                displayProducts(prod);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    "Product Milk, has price: 2, weight: 1000, expiration date: 10.01.2022"
                );
            });

            it("should show info about CannedGoods product", () => {
                let prod = new CannedGoodsNamespace.CannedGoods.Product(
                    "Tuna",
                    3,
                    200,
                    new Date(2023, 11, 30)
                );
                displayProducts(prod);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    "Product Tuna, has price: 3, weight: 200, expiration date: 30.12.2023"
                );
            });
        });
    });
});

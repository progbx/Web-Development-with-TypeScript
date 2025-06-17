import path from "path";

import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import {
    getRootLevelEntityByName,
    isEntityFunction,
    getFunctionParams,
} from "../test-utils/entityUtils";
import { tsCompile } from "../test-utils/tsCompile";
import {
    loadESTreeForFile,
    importModuleWithIgnoredErrors,
} from "../test-utils/fileUtils";

// There is a playground where you can check what ESTree generates
// parser for your TS code
// https://typescript-eslint.io/play

// We can't test all logic in *.js file. 
// Real logic testing is tested in the `index-logic.test.ts` file
// The rest is tested here

describe("Decorators types", () => {
    let fileContent;
    let fileESTree;
    let filePath;
    let taskSolutionIsEmpty;

    let rootModule;
    let once;
    let identifier;

    beforeEach(async () => {
        filePath = path.resolve(__dirname, "./index.ts");

        const fileLoadResult = await loadESTreeForFile(filePath);
        fileContent = fileLoadResult.fileContent;
        fileESTree = fileLoadResult.fileESTree;
        taskSolutionIsEmpty = fileLoadResult.fileIsEmpty;

        rootModule = await importModuleWithIgnoredErrors(filePath);

        once = rootModule?.once;
        identifier = rootModule?.identifier;
    });

    it("should not have TypeScript errors or warnings", () => {
        const diagnostics = tsCompile([filePath], fileContent);

        expect(taskSolutionIsEmpty).toBe(false);
        expect(diagnostics).toEqual("");
    });

    describe("'once' decorator", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "once",
                identifierPropKey: "id",
            });
        });

        it("should be a function", () => {
            expect(isEntityFunction(functionTestEntity)).toBe(true);
        });

        it("should expect 3 parameters", () => {
            const params = getFunctionParams(functionTestEntity);

            expect(params.length).toBe(3);
        });

        it("should expect descriptor", () => {
            const params = getFunctionParams(functionTestEntity);
            const descriptorParam = params[2];

            expect(
                descriptorParam.typeAnnotation.typeAnnotation.typeName.name
            ).toBe("PropertyDescriptor");
        });

        it("should return the same descriptor object as passed", () => {
            let testDescriptor = { value: () => {} };
            let actualResult = once(null, "", testDescriptor);

            expect(testDescriptor).toBe(actualResult);
        });
    });

    describe("'identifier' decorator", () => {
        let functionTestEntity;

        beforeEach(() => {
            functionTestEntity = getRootLevelEntityByName({
                parentEntity: fileESTree,
                entityName: "identifier",
                identifierPropKey: "id",
            });
        });

        it("should be a function", () => {
            expect(isEntityFunction(functionTestEntity)).toBe(true);
        });

        it("should expect 1 paramet for UID", () => {
            const params = getFunctionParams(functionTestEntity);
            const param = params[0];

            expect(params.length).toBe(1);

            expect(param.typeAnnotation.typeAnnotation.type).toBe(AST_NODE_TYPES.TSStringKeyword)
        });
    });
});

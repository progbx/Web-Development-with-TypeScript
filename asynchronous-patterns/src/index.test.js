import fsPromises from "fs/promises";
import path from "path";
import { ESLint } from "eslint";
import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { tsCompile } from "../test-utils/tsCompile";
import {
  getRootLevelEntityByName,
  getFunctionEntityBody,
  isEntityFunction,
  getFunctionParams,
  getEntityFromList,
} from "../test-utils/entityUtils";
import { invokeAfterDelay, getPosts } from "./index";

function mergeConfigWithCommon(baseConfig) {
  const commonESLintConfig = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
  };
  return Object.assign({}, commonESLintConfig, baseConfig);
}

describe("Asynchronous Typescript", () => {
  let fileContent;
  let fileESTree;
  let filePath;
  let fileHandle;
  let commonESLintConfig;
  let taskSolutionIsEmpty;

  beforeEach(async () => {
    filePath = path.resolve(__dirname, "index.ts");

    fileHandle = await fsPromises.open(filePath);
    fileContent = await fileHandle.readFile();
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
    fileHandle.close();
  });

  it("should not have TypeScript errors or warnings", () => {
    const diagnostics = tsCompile([filePath], fileContent);

    expect(taskSolutionIsEmpty).toBe(false);
    expect(diagnostics).toEqual("");
  });

  it("should not use explicit 'any'", async () => {
    const noExplicitAny = "@typescript-eslint/no-explicit-any";

    const rules = [noExplicitAny];

    const config = mergeConfigWithCommon({
      rules: {
        [noExplicitAny]: "error",
      },
    });

    const eslint = new ESLint({ baseConfig: config });

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

  describe("invokeAfterDelay", () => {
    let functionTestEntity;

    beforeEach(() => {
      functionTestEntity = getRootLevelEntityByName({
        parentEntity: fileESTree,
        entityName: "invokeAfterDelay",
        identifierPropKey: "id",
      });
    });

    it("should be a function", () => {
      expect(isEntityFunction(functionTestEntity)).toBe(true);
    });

    it("should expect 1 parameter", () => {
      const params = getFunctionParams(functionTestEntity);

      expect(params.length).toBe(1);
    });

    it("should not have a return type or return void", () => {
      const functionBody = getFunctionEntityBody(functionTestEntity);

      const isReturnNothing = !functionBody.returnType;
      const isReturnVoid =
        functionBody?.returnType?.type === AST_NODE_TYPES.TSTypeAnnotation &&
        functionBody?.returnType?.typeAnnotation?.type ===
          AST_NODE_TYPES.TSVoidKeyword;

      expect(isReturnNothing || isReturnVoid).toBe(true);
    });

    it("should expect function as a parameter", () => {
      const [callbackParamType] = getFunctionParams(functionTestEntity);

      expect(callbackParamType.typeAnnotation.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSFunctionType
      );
    });

    it("should expect function as a parameter", () => {
      const [callbackParamType] = getFunctionParams(functionTestEntity);

      expect(callbackParamType.typeAnnotation.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSFunctionType
      );
    });

    it("expected function param should not have parameters  ", () => {
      const [callbackParamType] = getFunctionParams(functionTestEntity);
      const callbackParamTypeParams =
        callbackParamType.typeAnnotation.typeAnnotation.params;

      expect(callbackParamTypeParams.length).toBe(0);
    });

    it("expected function param should return void", () => {
      const [callbackParamType] = getFunctionParams(functionTestEntity);
      const nestedTypeAnnotation =
        callbackParamType.typeAnnotation.typeAnnotation;

      expect(nestedTypeAnnotation.returnType.type).toBe(
        AST_NODE_TYPES.TSTypeAnnotation
      );

      expect(nestedTypeAnnotation.returnType.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSVoidKeyword
      );
    });

    it("should invoke callback after delay", (done) => {
      invokeAfterDelay((data) => {
        expect(data).toBe(undefined);
        done();
      });
    });

    it("should call a function after delay", (done) => {
      invokeAfterDelay(() => {
        // If this function called, it works
        expect(true).toBe(true);

        done();
      });
    });
  });

  describe("getPosts", () => {
    let functionTestEntity;
    let postTestEntity;

    beforeEach(() => {
      functionTestEntity = getRootLevelEntityByName({
        parentEntity: fileESTree,
        entityName: "getPosts",
        identifierPropKey: "id",
      });

      postTestEntity = getRootLevelEntityByName({
        parentEntity: fileESTree,
        entityName: "Post",
        identifierPropKey: "id",
      });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              body: "Test Body",
              id: 1,
              title: "Test Title",
              userId: 1,
            }),
        })
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should declare Post interface with correct properties", () => {
      const idEntity = getEntityFromList({
        entities: postTestEntity.body.body,
        identifierPropKey: "key",
        entityName: "id",
      });

      const bodyEntity = getEntityFromList({
        entities: postTestEntity.body.body,
        identifierPropKey: "key",
        entityName: "body",
      });

      const titleEntity = getEntityFromList({
        entities: postTestEntity.body.body,
        identifierPropKey: "key",
        entityName: "title",
      });

      const userIdEntity = getEntityFromList({
        entities: postTestEntity.body.body,
        identifierPropKey: "key",
        entityName: "userId",
      });

      expect(postTestEntity.type).toBe(AST_NODE_TYPES.TSInterfaceDeclaration);

      expect(idEntity.typeAnnotation.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSNumberKeyword
      );

      expect(bodyEntity.typeAnnotation.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSStringKeyword
      );

      expect(titleEntity.typeAnnotation.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSStringKeyword
      );

      expect(userIdEntity.typeAnnotation.typeAnnotation.type).toBe(
        AST_NODE_TYPES.TSNumberKeyword
      );
    });

    it("should be a function", () => {
      expect(isEntityFunction(functionTestEntity)).toBe(true);
    });

    it("should expect 1 parameter", () => {
      const params = getFunctionParams(functionTestEntity);

      expect(params.length).toBe(1);
    });

    it("should expect the first parameter to be an array of strings", () => {
      const params = getFunctionParams(functionTestEntity);
      const param = params[0];
      const rootTypeAnnotation = param.typeAnnotation;
      const elementType = rootTypeAnnotation.typeAnnotation.elementType;

      expect(params.length).toBe(1);
      expect(
        rootTypeAnnotation.typeAnnotation.type === AST_NODE_TYPES.TSArrayType
      ).toBe(true);
      expect(elementType.type).toBe(AST_NODE_TYPES.TSStringKeyword);
    });

    it("should return a promise", () => {
      const functionBody = getFunctionEntityBody(functionTestEntity);

      const returnType = functionBody.returnType;

      expect(returnType.type).toBe(AST_NODE_TYPES.TSTypeAnnotation);
      expect(returnType.typeAnnotation.typeName.name).toBe("Promise");
      expect(returnType.typeAnnotation.typeName.name).toBe("Promise");
    });

    it("should return a promise resolvins with arrau of posts", () => {
      const functionBody = getFunctionEntityBody(functionTestEntity);

      const returnType = functionBody.returnType;
      const returnTypeParams = returnType.typeAnnotation.typeArguments.params;
      const [promiseTypeArgument] = returnTypeParams;

      expect(promiseTypeArgument.type).toBe(AST_NODE_TYPES.TSArrayType);
      expect(promiseTypeArgument.elementType.typeName.name).toBe("Post");
    });

    it("should get posts from URLs", async () => {
      const urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
      ];

      const posts = await getPosts(urls);

      expect(posts).toHaveLength(3);
      expect(posts[0].id).toBe(1);
      expect(posts[0].body).toBe("Test Body");
      expect(posts[1].title).toBe("Test Title");
      expect(posts[2].userId).toBe(1);
    });

    it("should return an empty array for empty URLs", async () => {
      const emptyUrls = [];

      const emptyPosts = await getPosts(emptyUrls);

      expect(emptyPosts).toEqual([]);
    });
  });
});

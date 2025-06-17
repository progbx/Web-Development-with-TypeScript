import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function normalizeEntity(entityToNormalize) {
    if (entityToNormalize.type === AST_NODE_TYPES.ExportNamedDeclaration) {
        return entityToNormalize.declaration;
    }

    return entityToNormalize;
}

export function getRootLevelEntityByName({
    parentEntity,
    entityName,
    identifierPropKey = "id",
}) {
    const { body } = parentEntity;

    const entity = body.find((item) => {
        let itemBody = normalizeEntity(item);

        if (itemBody.type === AST_NODE_TYPES.VariableDeclaration) {
            return (
                itemBody.declarations[0][identifierPropKey].name === entityName
            );
        }

        return itemBody[identifierPropKey]?.name === entityName;
    });

    return normalizeEntity(entity);
}

export function getEntityFromList({
    entities,
    entityName,
    identifierPropKey = "id",
}) {
    return entities.find((item) => {
        return item[identifierPropKey].name === entityName;
    });
}

function checkUnionTypeBase(rootTypeAnnotation, unifiedTypesToCheck) {
    return (
        rootTypeAnnotation.type === AST_NODE_TYPES.TSUnionType &&
        rootTypeAnnotation.types.length === unifiedTypesToCheck.length
    );
}

function compareWithUnifiedTypes(typeItem, unifiedTypesToCheck) {
    return unifiedTypesToCheck.some((unifiedTypeItem) => {
        const [unifiedTypeName, optionalLiteralValue] = unifiedTypeItem;

        if (typeItem.type !== AST_NODE_TYPES.TSLiteralType) {
            // For type Union = "string1" | "string2" it has different formatting
            return typeItem.type === unifiedTypeName;
        }

        return (
            typeItem.literal.type === unifiedTypeName &&
            typeItem.literal.value === optionalLiteralValue
        );
    });
}

export function checkUnionType({ entity, unifiedTypesToCheck }) {
    const rootTypeAnnotation =
        entity?.typeAnnotation?.typeAnnotation || entity.typeAnnotation;

    return (
        checkUnionTypeBase(rootTypeAnnotation, unifiedTypesToCheck) &&
        rootTypeAnnotation.types.every((typeItem) =>
            compareWithUnifiedTypes(typeItem, unifiedTypesToCheck)
        )
    );
}

export function getFunctionEntityBody(functionTestEntity) {
    if (functionTestEntity.type === AST_NODE_TYPES.FunctionDeclaration) {
        return functionTestEntity;
    }

    if (functionTestEntity.type === AST_NODE_TYPES.VariableDeclaration) {
        const variableDeclarator = functionTestEntity.declarations[0];

        if (
            variableDeclarator.init.type ===
                AST_NODE_TYPES.ArrowFunctionExpression ||
            variableDeclarator.init.type === AST_NODE_TYPES.FunctionExpression
        ) {
            return variableDeclarator.init;
        }
    }

    return null;
}

export function isMethod(functionTestEntity) {
    return functionTestEntity.type === AST_NODE_TYPES.TSMethodSignature;
}

export function isEntityFunction(functionTestEntity) {
    return !!getFunctionEntityBody(functionTestEntity) || isMethod(functionTestEntity);
}

export function getFunctionParams(functionTestEntity) {
    const functionBody = getFunctionEntityBody(functionTestEntity);

    return functionBody?.params || [];
}

export function isCustomType(entity, customTypeName) {
    return (
        entity.typeAnnotation.typeAnnotation.type ===
            AST_NODE_TYPES.TSTypeReference &&
        entity.typeAnnotation.typeAnnotation.typeName.name === customTypeName
    );
}

export function isOmitType({
    expectedOmittedProperties,
    typeAnnotation,
    omittedTypeName = ""
}) {
    const expectedOmittedPropertiesSorted =
        expectedOmittedProperties.sort();

    const typeArgumentsParams = typeAnnotation.typeArguments.params;
    const typeName = typeAnnotation.typeName.name;

    const firstTypeParam = typeArgumentsParams[0];
    const secondTypeParam = typeArgumentsParams[1];

    const isFirstTypeParamValid =
        firstTypeParam.typeName.name === omittedTypeName;

    // There is a "types" property with array of union type alias
    // only for a union type
    // If you provide only one string, it is just a TSLiteralType
    // Omit<Product, "prop1" | "prop2"> - this is a TSUnionType with "types" property
    // Omit<Product, "prop1"> - this is a TSLiteralType without "type" property
    const realOmittedProperties = secondTypeParam.types
        ? secondTypeParam.types
              .map((typeItem) => typeItem.literal.value)
              .sort()
        : [secondTypeParam.literal.value];

    const isSecondTypeCorrectAlias = secondTypeParam.types
        ? secondTypeParam.type === AST_NODE_TYPES.TSUnionType
        : secondTypeParam.type === AST_NODE_TYPES.TSLiteralType;

    const isSecondTypeParamValid =
        isSecondTypeCorrectAlias &&
        expectedOmittedPropertiesSorted.toString() ===
            realOmittedProperties.toString();

    return (
        typeName === "Omit" &&
        isFirstTypeParamValid &&
        isSecondTypeParamValid
    );
}

import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function normalizeEntity(entityToNormalize) {
    return entityToNormalize.type === AST_NODE_TYPES.ExportNamedDeclaration
        ? entityToNormalize.declaration
        : entityToNormalize;
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

export function isEntityFunction(functionTestEntity) {
    return !!getFunctionEntityBody(functionTestEntity);
}

export function getFunctionParams(functionTestEntity) {
    const functionBody = getFunctionEntityBody(functionTestEntity);

    return functionBody?.params || [];
}
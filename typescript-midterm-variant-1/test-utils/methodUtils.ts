import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function getMethodParams(methodEntity: any): any[] {
    const value = methodEntity?.value || methodEntity;
    
    return value?.params || [];
}

export function getMethodParamByName(methodEntity: any, paramName: string): any {
    const params = getMethodParams(methodEntity);

    return params.find((paramItem) => paramItem.parameter.name === paramName);
}

export function checkMethodParamsType(methodEntity: any, paramNumber: number, expectedType: AST_NODE_TYPES): boolean {
    const params = getMethodParams(methodEntity);
    const param = params[paramNumber];
    
    return param?.typeAnnotation?.typeAnnotation?.type === expectedType;
}

export function checkArrayParamsType(methodEntity: any, paramNumber: number, expectedType: AST_NODE_TYPES): boolean {
    const params = getMethodParams(methodEntity);
    const param = params[paramNumber];

    return param?.typeAnnotation?.typeAnnotation?.elementType?.type === expectedType;
}

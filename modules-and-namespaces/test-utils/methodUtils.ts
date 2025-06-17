import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function getMethodParams(methodEntity: any): any[] {
    const value = methodEntity?.value;
    
    return value?.params || [];
}

export function checkMethodParamsType(methodEntity: any, paramNumber: number, expectedType: AST_NODE_TYPES): boolean {
    const params = getMethodParams(methodEntity);
    const param = params[paramNumber];
    
    return param?.typeAnnotation?.typeAnnotation?.type === expectedType;
}
export type Point = {
    x: number;
    y: number;
};
export type Shape = {
    name: string;
    points: Point[];
};
export declare const shapeNumbers: number[];
export declare const mainShapeName = "Circle";
export declare const shapeRegExp: RegExp;
export declare function calculateArea(shape: Shape): number;
export declare function printShapeDetails(shape: Shape): void;

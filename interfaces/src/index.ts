export interface IDrawShape {
    name: string;
    size: number;
    color?: string;
    calculateSquare(): number;
}
  
export class Circle implements IDrawShape {
    name: string;
    size: number;
    color?: string;
    constructor(name: string, radius: number, color?: string) {
        this.name = name;
        this.size = radius;
        this.color = color;
    }
    calculateSquare(): number {
        return Math.PI * this.size * this.size;
    }
}
  
export class Square implements IDrawShape {
    name: string;
    size: number;
    color?: string;
    constructor(name: string, sideLength: number, color?: string) {
        this.name = name;
        this.size = sideLength;
        this.color = color;
    }
    calculateSquare(): number {
        return this.size * this.size;
    }
}
  
export function sortShapes(shapes: IDrawShape[]): string[] {
    return shapes
        .slice()
        .sort((a, b) => a.calculateSquare() - b.calculateSquare())
        .map((shape) => shape.name);
}
  
export interface IPaintShape extends IDrawShape {
    color: string;
}
  
export interface IChangeShape extends IDrawShape {
    increaseSize(multiplier: number): void;
    decreaseSize(divisor: number): void;
}
  
export class FilledFlexibleCircle implements IPaintShape, IChangeShape {
    name: string;
    size: number;
    color: string;
    constructor(name: string, radius: number, color: string) {
        this.name = name;
        this.size = radius;
        this.color = color;
    }
    calculateSquare(): number {
        return Math.PI * this.size * this.size;
    }
    increaseSize(multiplier: number): void {
        this.size *= multiplier;
    }
    decreaseSize(divisor: number): void {
        if (divisor !== 0) {
            this.size /= divisor;
        }
    }
}
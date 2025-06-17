// Define custom types
export type Point = { x: number; y: number };

export type Shape = { name: string; points: Point[] };

export const shapeNumbers = [0, 1, 2];
export const mainShapeName = "Circle";

export const shapeRegExp = /circle {4}shape/gi;

// Function to calculate the area of a shape
export function calculateArea(shape: Shape): number {
  const n = shape.points.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += shape.points[i].x * shape.points[j].y;
    area -= shape.points[j].x * shape.points[i].y;
  }

  return Math.abs(area) / 2;
}

// Function to print the details of a shape
export function printShapeDetails(shape: Shape): void {
  console.log("Shape: " + shape.name);
  console.log("Points:");
  shape.points.forEach(function (point, index) {
    console.log(
      "Point " + (index + 1) + ": (" + point.x + ", " + point.y + ")"
    );
  });
  console.log("Area: " + calculateArea(shape));
}

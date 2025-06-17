"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateArea = calculateArea;
exports.mainShapeName = void 0;
exports.printShapeDetails = printShapeDetails;
exports.shapeRegExp = exports.shapeNumbers = void 0;
// Define custom types

var shapeNumbers = exports.shapeNumbers = [0, 1, 2];
var mainShapeName = exports.mainShapeName = "Circle";
var shapeRegExp = exports.shapeRegExp = /circle {4}shape/gi;

// Function to calculate the area of a shape
function calculateArea(shape) {
  var n = shape.points.length;
  var area = 0;
  for (var i = 0; i < n; i++) {
    var j = (i + 1) % n;
    area += shape.points[i].x * shape.points[j].y;
    area -= shape.points[j].x * shape.points[i].y;
  }
  return Math.abs(area) / 2;
}

// Function to print the details of a shape
function printShapeDetails(shape) {
  console.log("Shape: " + shape.name);
  console.log("Points:");
  shape.points.forEach(function (point, index) {
    console.log("Point " + (index + 1) + ": (" + point.x + ", " + point.y + ")");
  });
  console.log("Area: " + calculateArea(shape));
}

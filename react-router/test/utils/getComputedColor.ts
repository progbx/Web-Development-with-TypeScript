import hexRgb from "hex-rgb";

export function getComputedColor(hexString: string): string {
    const { red, green, blue } = hexRgb(hexString);
    
    return `rgb(${red}, ${green}, ${blue})`;
}
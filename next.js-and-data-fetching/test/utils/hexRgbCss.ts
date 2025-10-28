import hexRgb from "hex-rgb";

export function hexRgbCss(color: string): string {
    return hexRgb(color, { format: "css" }).replace(/ /g, ", ");
}
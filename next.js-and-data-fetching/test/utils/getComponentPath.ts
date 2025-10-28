import path from "path";

const projectRootPath = path.resolve(__dirname, "../../");

export function getComponentPath(componentPathEnding: string): string {
  return path.join(projectRootPath, `src/app/${componentPathEnding}`);
}

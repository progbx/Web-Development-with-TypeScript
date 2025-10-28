import "@testing-library/jest-dom";
import path from "path";
import { render, screen, cleanup } from "@testing-library/react";
import { checkFileExistance, readJsonFile } from "./utils/readJsonFile";
import { mergePackageDependenciesNames } from "./utils/mergePackageDependenciesNames";
import { importModuleWithIgnoredErrors } from "./utils/importModuleWithIgnoredErrors";
import { hexRgbCss } from "./utils/hexRgbCss";
import { CSSProperties } from "react";
import { readTextFile } from "./utils/readTextFile";

try {
    jest.mock("../src/components/Input.module.css", () => {
        return {
            "input-module": "input-module",
            "label-module": "label-module",
        };
    });
} catch {}

describe("Styling", () => {
    let packageJsonParsed: any;
    let projectRootPath: string;
    let App: any;
    let InputCssModule: any = null;

    let InputCssModuleFileString: string;

    beforeEach(async () => {
        projectRootPath = path.resolve(__dirname, "../");
        const packageJsonPath = path.resolve(projectRootPath, "package.json");

        const packageJSONFileReadResult = await readJsonFile(packageJsonPath);
        packageJsonParsed = packageJSONFileReadResult.fileJSON;

        const AppModulePath = path.join(projectRootPath, "src/App");
        const InputCssModulePath = getComponentPath("Input.module.css");

        const AppModule = await importModuleWithIgnoredErrors(AppModulePath);
        InputCssModule = await importModuleWithIgnoredErrors(
            InputCssModulePath
        );

        InputCssModuleFileString = await readTextFile(InputCssModulePath);

        App = AppModule?.default;
    });

    function getComponentPath(componentFileName: string): string {
        return path.join(
            projectRootPath,
            `src/components/${componentFileName}`
        );
    }

    afterEach(cleanup);

    describe("1. Inline styling", () => {
        let paragraphStyles: CSSProperties;

        beforeEach(() => {
            paragraphStyles = {
                marginTop: "0.5rem",
                color: hexRgbCss("#6b7280"),
            };
        });

        it("should add a 'style' attribute to the <div>", () => {
            const { baseElement } = render(<App />);

            const quoteRootDiv = baseElement.querySelector(".quote-component");

            expect(quoteRootDiv?.getAttribute("style")).toBeTruthy();
        });

        it("root <div> should have expected inline styles", () => {
            const { baseElement } = render(<App />);

            const quoteRootDiv = baseElement.querySelector(".quote-component");

            expect((quoteRootDiv as any)?.style).toEqual(
                expect.objectContaining({
                    backgroundColor: hexRgbCss("#4299e1"),
                    borderRadius: "0.25rem",
                    padding: "1.25rem",
                })
            );
        });

        it("<p> with text should have expected inline styles", async () => {
            render(<App />);

            const textP = await screen.findByText(
                `"The only limit to our realization of tomorrow is our doubts of today."`
            );

            expect(textP?.style).toEqual(
                expect.objectContaining(paragraphStyles)
            );
        });

        it("<p> with author should have expected inline styles", async () => {
            render(<App />);

            const authorP = await screen.findByText("- Franklin D. Roosevelt");

            expect(authorP?.style).toEqual(
                expect.objectContaining(paragraphStyles)
            );
        });
    });

    describe("2. CSS Modules", () => {
        // By default Jest doesn't process CSS modules
        // So, we have to add styles inside by ourselves
        function putInputCssModuleStylesInside(baseElement: HTMLElement) {
            const styleElement = document.createElement("style");
            styleElement.innerHTML = InputCssModuleFileString;

            baseElement.prepend(styleElement);
        }

        it("Input.module.css file should exist", () => {
            expect(InputCssModule).not.toBeNull();
        });

        it("<label> should have a className", async () => {
            render(<App />);

            const label = await screen.findByText("Test Input");

            expect(label.className).toBe("label-module");
        });

        it("<input> should have a className", async () => {
            render(<App />);

            const input = await screen.findByLabelText("Test Input");

            expect(input.className).toBe("input-module");
        });

        it("should have correct styling for <label>", async () => {
            const { baseElement } = render(<App />);

            putInputCssModuleStylesInside(baseElement);

            const label = await screen.findByText("Test Input");

            const labelStyles = getComputedStyle(label);

            expect(labelStyles).toEqual(
                expect.objectContaining({
                    display: "block",
                    fontSize: "0.875rem",
                    color: hexRgbCss("#4b5563"),
                })
            );
        });

        it("should have correct styling for <input>", async () => {
            const { baseElement } = render(<App />);

            putInputCssModuleStylesInside(baseElement);

            const input = await screen.findByLabelText("Test Input");
            const inputStyles = getComputedStyle(input);

            expect(inputStyles).toEqual(
                expect.objectContaining({
                    borderWidth: "1px",
                    borderColor: "#d1d5db",
                    padding: "0.5rem",
                    marginTop: "0.25rem",
                    borderRadius: "0.125rem",
                })
            );
        });
    });

    describe("3. Styled Components", () => {
        it("styled-components should be installed", () => {
            const mergedDepAndDevDeps =
                mergePackageDependenciesNames(packageJsonParsed);

            expect(mergedDepAndDevDeps.includes("styled-components")).toBe(
                true
            );
        });

        // StyledShowcase
        it("should apply styles to <StyledShowcase> and use <section> HTML tag", async () => {
            const { baseElement } = render(<App />);

            const styledElement = baseElement.querySelector(
                ".styled-components-section section"
            ) as HTMLElement;
            const styledElementComputedStyles = getComputedStyle(styledElement);

            expect(styledElement.tagName).toBe("SECTION");
            expect(styledElement.className).toBeTruthy();
            expect(styledElementComputedStyles).toEqual(
                expect.objectContaining({
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    padding: "1rem",
                    boxSizing: "border-box",
                })
            );
        });

        // StyledProduct
        it("should apply styles to <StyledProduct> and use <div> HTML tag", async () => {
            const { baseElement } = render(<App />);

            const styledElement = baseElement.querySelector(
                ".styled-components-section section > div"
            ) as HTMLElement;
            const styledElementComputedStyles = getComputedStyle(styledElement);

            expect(styledElement.tagName).toBe("DIV");
            expect(styledElement.className).toBeTruthy();
            expect(styledElementComputedStyles).toEqual(
                expect.objectContaining({
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "1rem",
                    boxSizing: "border-box",
                    textAlign: "center",
                })
            );
        });

        // StyledName
        it("should apply styles to <StyledName> and use <h2> HTML tag", async () => {
            render(<App />);

            const styledElement = await screen.findByText("Product Name");
            const styledElementComputedStyles = getComputedStyle(styledElement);

            expect(styledElement.tagName).toBe("H2");
            expect(styledElement.className).toBeTruthy();
            expect(styledElementComputedStyles).toEqual(
                expect.objectContaining({
                    fontSize: "1.2rem",
                    color: hexRgbCss("#333"),
                    marginBottom: "0.5rem",
                })
            );
        });

        // StyledPrice
        it("should apply styles to <StyledPrice> and use <p> HTML tag", async () => {
            render(<App />);

            const styledElement = await screen.findByText("Product Price");
            const styledElementComputedStyles = getComputedStyle(styledElement);

            expect(styledElement.tagName).toBe("P");
            expect(styledElement.className).toBeTruthy();
            expect(styledElementComputedStyles).toEqual(
                expect.objectContaining({
                    color: hexRgbCss("#888"),
                    marginBottom: "1rem",
                })
            );
        });

        // StyledButton
        it("should apply styles to <StyledButton> and use <p> HTML tag", async () => {
            render(<App />);

            const styledElement = await screen.findByText("Buy Now");
            const styledElementComputedStyles = getComputedStyle(styledElement);

            expect(styledElement.tagName).toBe("BUTTON");
            expect(styledElement.className).toBeTruthy();
            expect(styledElementComputedStyles).toEqual(
                expect.objectContaining({
                    backgroundColor: hexRgbCss("#007bff"),
                    color: "white",
                    //border: "none",
                    padding: "0.5rem 1rem",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                })
            );
        });
    });

    describe("4. Tailwind", () => {
        let tailwindConfigPath: string;

        beforeEach(() => {
            tailwindConfigPath = path.join(
                projectRootPath,
                "tailwind.config.js"
            );
        });

        function includesAllClassNames(
            classList: DOMTokenList,
            stringsToBeIncluded: string[]
        ): boolean {
            return stringsToBeIncluded.every((item) =>
                classList.contains(item)
            );
        }

        it("tailwindcss should be installed", () => {
            const mergedDepAndDevDeps =
                mergePackageDependenciesNames(packageJsonParsed);

            expect(mergedDepAndDevDeps.includes("tailwindcss")).toBe(true);
        });

        it("should create a tailwind.config.js file", async () => {
            const { fileExists } = await checkFileExistance(tailwindConfigPath);

            expect(fileExists).toBe(true);
        });

        it('should set the "content" property', async () => {
            const tailwindConfigModule = await importModuleWithIgnoredErrors(
                tailwindConfigPath
            );
            const tailwindConfig = tailwindConfigModule?.default;

            expect(tailwindConfig?.content).toEqual([
                "./src/**/*.{js,ts,jsx,tsx,mdx}",
            ]);
        });

        it("should import 'tailwindcss' utilities to the App.css", async () => {
            const fileContent = await readTextFile("src/App.css");

            expect(/@tailwind +base/.test(fileContent)).toBe(true);
            expect(/@tailwind +components/.test(fileContent)).toBe(true);
            expect(/@tailwind +utilities/.test(fileContent)).toBe(true);
        });

        it("should create a Card.tsx file", async () => {
            const componentPath = getComponentPath("Card.tsx");
            const componentModule = await importModuleWithIgnoredErrors(
                componentPath
            );

            expect(componentModule).not.toBe(null);
        });

        it("should apply all Tailwind class names for a <div>", () => {
            const { baseElement } = render(<App />);

            const element = baseElement.querySelector(
                ".tailwind-section .tailwind-section-wrapper > div"
            ) as HTMLElement;

            const expectedClassNames = [
                "bg-blue-500",
                "rounded",
                "shadow",
                "p-5",
            ];

            expect(
                includesAllClassNames(element.classList, expectedClassNames)
            ).toBe(true);
        });

        it("should apply all Tailwind class names for a <img>", () => {
            const { baseElement } = render(<App />);

            const element = baseElement.querySelector(
                ".tailwind-section .tailwind-section-wrapper > div > img"
            ) as HTMLElement;

            const expectedClassNames = [
                "h-48",
                "w-full",
                "object-cover",
                "md:w-48",
            ];

            expect(
                includesAllClassNames(element.classList, expectedClassNames)
            ).toBe(true);
        });

        it("should apply all Tailwind class names for a <h2>", () => {
            const { baseElement } = render(<App />);

            const element = baseElement.querySelector(
                ".tailwind-section .tailwind-section-wrapper > div > h2"
            ) as HTMLElement;

            const expectedClassNames = [
                "uppercase",
                "tracking-wide",
                "text-sm",
                "text-indigo-500",
                "font-semibold",
            ];

            expect(
                includesAllClassNames(element.classList, expectedClassNames)
            ).toBe(true);
        });

        it("should apply all Tailwind class names for a <p>", () => {
            const { baseElement } = render(<App />);

            const element = baseElement.querySelector(
                ".tailwind-section .tailwind-section-wrapper > div > p"
            ) as HTMLElement;

            const expectedClassNames = ["mt-2", "text-gray-500"];

            expect(
                includesAllClassNames(element.classList, expectedClassNames)
            ).toBe(true);
        });

        it("should apply all Tailwind class names for a <button>", () => {
            const { baseElement } = render(<App />);

            const element = baseElement.querySelector(
                ".tailwind-section .tailwind-section-wrapper > div > button"
            ) as HTMLElement;

            const expectedClassNames = [
                "mt-5",
                "px-4",
                "py-1",
                "border-blue-500",
                "border",
                "text-blue-500",
                "rounded",
                "duration-300",
            ];

            expect(
                includesAllClassNames(element.classList, expectedClassNames)
            ).toBe(true);
        });
    });
});

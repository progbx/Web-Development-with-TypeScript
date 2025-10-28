import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getComputedColor } from "./utils";
import React from "react";

import App from "../src/App";

describe("React Elements & JSX", () => {
    describe("Heading", () => {
        it("should create heading", async () => {
            render(<App />);
            const heading = await screen.findByRole("heading");

            expect(heading).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", async () => {
            render(<App />);
            const heading = await screen.findByRole("heading");

            expect(heading.tagName).toBe("H1");
        });

        it("should use React.createElement for the element", async () => {
            const spy = jest.spyOn(React, "createElement");

            const expectedParameters = [
                "h1",
                {
                    style: { color: "#999", fontSize: "19px" },
                },
                "Solar system planets",
            ];

            render(<App />);

            expect(spy).toHaveBeenCalledWith(...expectedParameters);
        });

        it("should have correct text in heading", async () => {
            render(<App />);
            const heading = await screen.findByRole("heading");

            expect(heading.textContent?.trim()).toBe("Solar system planets");
        });

        it("should add styles to heading", async () => {
            render(<App />);
            const heading = await screen.findByRole("heading");

            const computedStyle = window.getComputedStyle(heading);
            const expectedResult = getComputedColor("#999");

            expect(computedStyle.color).toBe(expectedResult);
            expect(computedStyle.fontSize).toBe("19px");
        });
    });

    describe("List", () => {
        it("should have a list of planets", async () => {
            render(<App />);
            const list = await screen.findByRole("list");

            expect(list).toBeInTheDocument();
        });

        it("should display all expected planets in the list", async () => {
            render(<App />);
            const list = await screen.findByRole("list");
            const { getAllByRole } = within(list);

            const items = getAllByRole("listitem");

            expect(items.length).toBe(8);
        });

        it("should display all expected planets names correctly", async () => {
            render(<App />);
            const list = await screen.findByRole("list");
            const { getAllByRole } = within(list);

            const listItems = getAllByRole("listitem");
            const itemNames = listItems.map((item) => item.textContent?.trim());

            const expectedResult = [
                "Mercury",
                "Venus",
                "Earth",
                "Mars",
                "Jupiter",
                "Saturn",
                "Uranus",
                "Neptune",
            ];

            expect(itemNames).toEqual(expectedResult);
        });

        it("should add an expected class name", async () => {
            render(<App />);
            const list = await screen.findByRole("list");

            expect(list.classList.contains("planets-list")).toBe(true);
        });

        it("added class name should apply expected styles", async () => {
            render(<App />);
            const list = await screen.findByRole("list");
            const computedStyle = window.getComputedStyle(list);

            expect(computedStyle.fontSize).toBe("14px");
        });
    });
});

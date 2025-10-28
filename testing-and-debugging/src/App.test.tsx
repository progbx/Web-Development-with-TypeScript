import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("should match snapshot", () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should match snapshot after openning a menu", () => {
        const { asFragment, getByRole } = render(<App />);
        fireEvent.click(getByRole("button"));
        expect(asFragment()).toMatchSnapshot();
    });

    it("should have a correct page heading", () => {
        render(<App />);
        const heading = screen.getByRole("heading", { name: /Empower Your Journey with Our Solutions/i });
        expect(heading).toBeInTheDocument();
    });

    it("should change button text after clicking", () => {
        render(<App />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(button).toHaveTextContent("Close Menu");
    });

    it("should change button text after clicking twice", () => {
        render(<App />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        fireEvent.click(button);
        expect(button).toHaveTextContent("Open Menu");
    });

    it("should have a menu after clicking the button", () => {
        render(<App />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
    });

    it("should have four menu items", () => {
        render(<App />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        const nav = screen.getByRole("navigation");
        const list = nav.querySelector("ul");
        expect(list).toBeInTheDocument();
        const items = list?.querySelectorAll("li");
        expect(items).toHaveLength(4);
    });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import ValidatedInput from "../src/components/ValidatedInput.tsx";
import TodoList from "../src/components/TodoList.tsx";


describe("React Components, Lifecycle and Hooks", () => {
    describe("ValidatedInput", () => {
        it('should render an input element', () => {
            render(<ValidatedInput validationFunction={() => true} errorMessage="error message" />);

            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        it('should render an error message when input is invalid', () => {
            render(<ValidatedInput validationFunction={() => false} errorMessage="error message" />);
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });

            expect(screen.getByText('error message')).toBeInTheDocument();
        });

        describe("validation function check input length is 5 or bigger", () => {
            const validationFunction = (value: string) => value.length >= 5;

            it('should display an error message if the input is invalid', () => {
                render(<ValidatedInput validationFunction={validationFunction} errorMessage="Input is too short" />);
                fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
                expect(screen.queryByText('Input is too short')).toBeInTheDocument();
            });

            it('should NOT display an error message if the input is valid', () => {
                render(<ValidatedInput validationFunction={validationFunction} errorMessage="Input is too short" />);
                fireEvent.change(screen.getByRole('textbox'), { target: { value: '12345' } });
                expect(screen.queryByText ('Input is too short')).not.toBeInTheDocument();
            });
        });

        describe("validation function check input contains only digits", () => {
            const validationOnlyNumber = (value: string) => /^\d+$/.test(value);

            it('should display an error message if the input is invalid (input has numbers)', () => {
                render(<ValidatedInput validationFunction={validationOnlyNumber} errorMessage="Input should have only numbers" />);
                fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234TEST' } });
                expect(screen.queryByText('Input should have only numbers')).toBeInTheDocument();
            });

            it('should NOT display an error message if the input is valid', () => {
                render(<ValidatedInput validationFunction={validationOnlyNumber} errorMessage="Input should have only numbers" />);
                fireEvent.change(screen.getByRole('textbox'), { target: { value: '12345' } });
                expect(screen.queryByText ('Input should have only numbers')).not.toBeInTheDocument();
            });
        });
    });

    describe("TodoList", () => {
        it("should render input initially", () => {
            render(<TodoList />);

            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("should render 'Add Todo' button initially", () => {
            render(<TodoList />);

            expect(
                screen.getByRole("button", { name: /Add Todo/i })
            ).toBeInTheDocument();
        });

        it("should add a todo item when text is entered and Add Todo button is clicked", () => {
            render(<TodoList />);
            const input = screen.getByRole("textbox");
            const addButton = screen.getByRole("button", { name: /Add Todo/i });
            fireEvent.change(input, { target: { value: "New Todo" } });
            fireEvent.click(addButton);

            expect(screen.getByText("New Todo")).toBeInTheDocument();
        });

        it("should add a delete button when text is entered and Add Todo button is clicked", () => {
            render(<TodoList />);
            const input = screen.getByRole("textbox");
            const addButton = screen.getByRole("button", { name: /Add Todo/i });
            fireEvent.change(input, { target: { value: "New Todo" } });
            fireEvent.click(addButton);

            expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
        });

        it("does not add empty or whitespace-only todo items", () => {
            render(<TodoList />);
            const input = screen.getByRole("textbox");
            const addButton = screen.getByRole("button", { name: /Add Todo/i });
            fireEvent.change(input, { target: { value: "  " } });
            fireEvent.click(addButton);

            expect(screen.queryByRole("listitem")).toBeNull();
        });

        it("deletes a todo item when the Delete button is clicked", () => {
            render(<TodoList />);
            const input = screen.getByRole("textbox");
            const addButton = screen.getByRole("button", { name: /Add Todo/i });

            fireEvent.change(input, { target: { value: "Todo to delete" } });
            fireEvent.click(addButton);

            const deleteButton = screen.getByRole("button", { name: /Delete/i });
            fireEvent.click(deleteButton);

            expect(screen.queryByText("Todo to delete")).toBeNull();
        });
    });
});

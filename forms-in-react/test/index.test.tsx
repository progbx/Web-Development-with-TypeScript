import { act, fireEvent, render, screen } from "@testing-library/react";
import path from "path";
import "@testing-library/jest-dom";

import { importModuleWithIgnoredErrors } from "./utils/importWithNoErrors";
import { FC } from "react";

describe("Forms in React", () => {
    let userName: string;
    let userEmail: string;
    let userPassword: string;

    let Results: FC<any>;
    let Registration: FC<any>;
    let Button: FC<any>;
    let Input: FC<any>;

    beforeEach(() => {
        userName = "validUsername";
        userEmail = "validemail@example.com";
        userPassword = "ValidPassword1!";
    });

    // Import components in a way everything doesn't fail when no file
    beforeEach(async () => {
        const projectRootPath = path.resolve(__dirname, "../");
        const resultsComponentPath = path.join(projectRootPath, 'src/components/Results');
        const registrationComponentPath = path.join(projectRootPath, 'src/components/Registration');
        const buttonComponentPath = path.join(projectRootPath, 'src/components/Button');
        const inputComponentPath = path.join(projectRootPath, 'src/components/Input');

        const ResultsModule = await importModuleWithIgnoredErrors(resultsComponentPath)
        Results = ResultsModule?.default;
        
        const RegistrationModule = await importModuleWithIgnoredErrors(registrationComponentPath)
        Registration = RegistrationModule?.default;

        const ButtonModule = await importModuleWithIgnoredErrors(buttonComponentPath)
        Button = ButtonModule?.default;

        const InputModule = await importModuleWithIgnoredErrors(inputComponentPath)
        Input = InputModule?.default;
    });

    describe("Button", () => {
        it("should create Button", async () => {
            render(<Button label="test" />);

            const button = await screen.findByRole("button");

            expect(button).toBeInTheDocument();
        });

        it("should show label", async () => {
            render(<Button label="test" />);
            const button = await screen.findByRole("button");

            expect(button.textContent?.trim()).toBe("test");
        });
    });

    describe("Input", () => {
        let register: jest.Mock;

        beforeEach(() => {
            register = jest.fn();
        });

        it("should create Input component with label and input field", async () => {
            const { container } = render(
                <Input
                    label="test"
                    placeholder="test placeholer"
                    register={register}
                />
            );
            const input = container.querySelector("input");
            const label = container.querySelector("label");

            expect(input).toBeInTheDocument();
            expect(label).toBeInTheDocument();
        });
        
        it("should create Input component with label with proper text", async () => {
            const { container } = render(
                <Input
                    label="test"
                    placeholder="test placeholer"
                    register={register}
                />
            );
            const label = container.querySelector("label");
            expect(label?.textContent?.trim()).toBe("test");
        });

        it("should create Input component with input placeholder", async () => {
            const { container } = render(
                <Input
                    label="test"
                    placeholder="test placeholder"
                    register={register}
                />
            );
            
            const input = container.querySelector("input");
            expect(input?.getAttribute("placeholder")).toBe("test placeholder");
        });
    });

    describe("Results", () => {
        let resultData: {
            name: string;
            email: string;
            password: string;
        };

        beforeEach(() => {
            resultData = {
                name: userName,
                email: userEmail,
                password: userPassword,
            };
        });

        it("should create Results component", async () => {
            render(<Results data={resultData} />);
            const result = await screen.findByText("Registration Details");

            expect(result).toBeInTheDocument();
        });

        it("should show results in proper format", async () => {
            render(<Results data={resultData} />);
            
            const results = await screen.findByText(
                `User Name: ${userName}, User email: ${userEmail}, Password: ${userPassword}`
            );

            expect(results).toBeInTheDocument();
        });
    });

    describe("Register form", () => {
        it("should create form", async () => {
            const { container } = render(<Registration />);
            const form = container.querySelector("form");
            expect(form).toBeInTheDocument();
        });

        it("should contain name input", async () => {
            const { container } = render(<Registration />);
            const label = await screen.queryByText("Name");
            const input = container.querySelector('input[name="name"]');

            expect(label).toBeInTheDocument();
            expect(input).toBeInTheDocument();
        });

        it("should contain email input", async () => {
            const { container } = render(<Registration />);
            const label = await screen.queryByText("Email");
            const input = container.querySelector('input[name="email"]');

            expect(label).toBeInTheDocument();
            expect(input).toBeInTheDocument();
        });

        it("should contain password input", async () => {
            const { container } = render(<Registration />);
            const label = await screen.queryByText("Password");
            const input = container.querySelector('input[name="password"]');

            expect(label).toBeInTheDocument();
            expect(input).toBeInTheDocument();
        });

        it("should show error when form submited with empty field", async () => {
            render(<Registration />);
            // Works ONLY when for has "name" attribute
           
            const form = screen.getByRole("form");

            act(() => {
                fireEvent.submit(form);
            });

            const error = await screen.findByText("All fields are required!");

            expect(error).toBeInTheDocument();
        });

        it("should show <Results> on form submit", async () => {
            render(<Registration />);
            // Works ONLY when for has "name" attribute
            
            const form = screen.getByRole("form");

            act(() => {
                fireEvent.change(screen.getByPlaceholderText("Enter Name"), {
                    target: { value: userName },
                });

                fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
                    target: { value: userEmail },
                });

                fireEvent.change(
                    screen.getByPlaceholderText("Enter Password"),
                    {
                        target: { value: userPassword },
                    }
                );
            });

            act(() => {
                fireEvent.submit(form);
            });

            const results = await screen.findByText(
                `User Name: ${userName}, User email: ${userEmail}, Password: ${userPassword}`
            );

            expect(results).toBeInTheDocument();
        });
    });
});

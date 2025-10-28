import "@testing-library/jest-dom";

import path from "path";
import { importModuleWithIgnoredErrors } from "./utils";
import { render, screen } from "@testing-library/react";

import { ForecastModel } from "../src/data/Forecast.model";
import { WeatherModel } from "../src/data/Weather.model";
import ReactDomClient from "react-dom/client";
import { checkFileExistance } from "./utils/readJsonFile.ts";

const currentWeather: WeatherModel = {
    temperature: 74,
    description: "Snowy",
    location: "New York",
};

const forecastData: ForecastModel[] = [
    { day: "Friday", temperature: 65, description: "Cloudy" },
    { day: "Saturday", temperature: 60, description: "Sunny" },
    { day: "Sunday", temperature: 64, description: "Rainny" },
];

jest.mock("../src/data/weatherData", () => ({
    currentWeather,
    forecastData,
}));

const BrowserRouterMock = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="BrowserRouter">{children}</div>
);

jest.mock("react-router-dom", () => ({
    BrowserRouter: BrowserRouterMock,
}));

describe("React Rendering Patterns", () => {
    let projectRootPath: string;

    let AppComponent: any;

    beforeEach(async () => {
        projectRootPath = path.resolve(__dirname, "../");

        const appComponentPath = path.join(projectRootPath, "src/App.tsx");
        const appComponentModule = await importModuleWithIgnoredErrors(
            appComponentPath
        );

        AppComponent = appComponentModule?.default;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Create a WeatherCard component", () => {
        it("should render a WeatherCard", async () => {
            render(<AppComponent />);

            const heading = await screen.findByRole("heading", {
                name: "New York",
            });
            const temperature = screen.getByText("74°F");
            const description = screen.getByText("Snowy");

            expect(heading).toBeInTheDocument();
            expect(temperature).toBeInTheDocument();
            expect(description).toBeInTheDocument();
        });

        it("should render a WeatherCard with a 'like' button", async () => {
            render(<AppComponent />);

            const likeButton = await screen.findByRole("button", {
                name: "add a 'like' for the weather card",
            });

            expect(likeButton).toBeInTheDocument();
        });

        it("should show an alert when the 'like' button is clicked", async () => {
            render(<AppComponent />);

            const likeButton = await screen.findByRole("button", {
                name: "add a 'like' for the weather card",
            });

            window.alert = jest.fn();

            likeButton.click();

            expect(window.alert).toHaveBeenCalledWith(
                "Cool, we like this weather too!"
            );
        });
    });

    describe("Create a Forecast component", () => {
        it("should render a Forecast component", async () => {
            render(<AppComponent />);

            const forecastHeading = await screen.findByRole("heading", {
                name: "3-Day Forecast",
            });

            expect(forecastHeading).toBeInTheDocument();
        });

        it("should render a list of forecast items", async () => {
            render(<AppComponent />);

            const forecastList = await screen.findByRole("list");
            const forecastItems = await screen.findAllByRole("listitem");

            expect(forecastList).toBeInTheDocument();
            expect(forecastItems).toHaveLength(3);
        });

        it("should render a forecast item with the correct data", async () => {
            render(<AppComponent />);

            const forecastItems = await screen.findAllByRole("listitem");

            const [firstItem, secondItem, thirdItem] = forecastItems;

            expect(firstItem).toHaveTextContent("Friday");
            expect(firstItem).toHaveTextContent("65°F");
            expect(firstItem).toHaveTextContent("Cloudy");

            expect(secondItem).toHaveTextContent("Saturday");
            expect(secondItem).toHaveTextContent("60°F");
            expect(secondItem).toHaveTextContent("Sunny");

            expect(thirdItem).toHaveTextContent("Sunday");
            expect(thirdItem).toHaveTextContent("64°F");
            expect(thirdItem).toHaveTextContent("Rainny");
        });
    });

    describe("Set Up Streaming Server-Side Rendering", () => {
        let hydrateRootSpy: any;
        let getElementByIdSpy: any;

        let rootElementMock: any;

        beforeEach(() => {
            rootElementMock = { iam: "root" };

            getElementByIdSpy = jest
                .spyOn(document, "getElementById")
                .mockReturnValue(rootElementMock);

            hydrateRootSpy = jest
                .spyOn(ReactDomClient, "hydrateRoot")
                .mockImplementation();
        });

        it("should hydrate the root element in main-client.tsx", async () => {
            try {
                await import("../src/main-client.tsx");
            } catch {}

            expect(hydrateRootSpy).toHaveBeenCalledWith(
                rootElementMock,
                <BrowserRouterMock>
                    <AppComponent />
                </BrowserRouterMock>
            );
        });

        it("should create a main-server.tsx file", async () => {
            const mainServerPath = path.join(
                projectRootPath,
                "src/main-server.tsx"
            );

            const { fileExists } = await checkFileExistance(mainServerPath);

            expect(fileExists).toBe(true);
        });
    });
});

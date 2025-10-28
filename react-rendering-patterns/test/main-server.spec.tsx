import { renderToPipeableStream } from "react-dom/server";
import path from "path";
import { importModuleWithIgnoredErrors } from "./utils";

jest.mock("react-dom/server", () => ({
    renderToPipeableStream: jest.fn(),
}));

const StaticRouterMock = ({
    children,
    location,
}: {
    children: React.ReactNode;
    location: string;
}) => (
    <div data-testid="StaticRouter" data-location={location}>
        {children}
    </div>
);

jest.mock("react-router-dom/server", () => ({
    StaticRouter: StaticRouterMock,
}));

describe("main-server.tsx", () => {
    let projectRootPath: string;

    beforeEach(() => {
        projectRootPath = path.resolve(__dirname, "../");
    });

    it("should render the app with the StaticRouter in main-server.tsx", async () => {
        const mainServerPath = path.join(
            projectRootPath,
            "src/main-server.tsx"
        );
        const options: any = { weAreOptions: true };
        const appComponentPath = path.join(projectRootPath, "src/App.tsx");
        const appComponentModule = await importModuleWithIgnoredErrors(
            appComponentPath
        );

        const AppComponent = appComponentModule?.default;

        const mainServerModule = await importModuleWithIgnoredErrors(
            mainServerPath
        );

        const render = mainServerModule?.default;

        if (render) {
            render("http://localhost", options);
        }

        expect(renderToPipeableStream).toHaveBeenCalledWith(
            <StaticRouterMock location="http://localhost">
                <AppComponent />
            </StaticRouterMock>,
            options
        );
    });
});

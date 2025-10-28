import "@testing-library/jest-dom";
import { simpleWaitFor } from "./utils";

/* We have to have these tests separately cause we are testing:

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

In the `index.test.tsx` file, the react-testing-library is imported,
and it breaks tests from this file
*/

const mockAppHeading = "I am an App";

jest.mock("../src/App", () => ({
    __esModule: true,
    default: () => <h2>{mockAppHeading}</h2>,
}));

describe("main.tsx", () => {
    it("should render <App> inside the root", async () => {
        const mockRoot = window.document.createElement("DIV");
        mockRoot.id = "root";
        window.document.body.append(mockRoot);

        // When it is imported, it is automatically renders to the page
        await import("../src/main");

        await simpleWaitFor(() => {
            const mockHeading = window.document.querySelector("#root h2");

            expect(mockHeading?.textContent).toBe(mockAppHeading);
        });
    });
});

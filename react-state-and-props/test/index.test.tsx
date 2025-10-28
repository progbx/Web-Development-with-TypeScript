import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import App from "../src/App";
import { FC } from "react";
import { importModuleWithIgnoredErrors } from "./utils/importWithNoErrors";
import mockPhotos from "../src/components/PhotoCard/__mock__/index.ts";
import path from "path";

describe("Props and State", () => {
    const photo = {
        id: 1,
        location: "New York",
        imageUrl: "https://example.com/image.jpg",
        description: "A beautiful view of New York City.",
    };
    let Footer: FC<any>;
    let Gallery: FC<any>;
    let Header: FC<any>;
    let PhotoCard: FC<any>;

    beforeEach(async () => {
        const projectRootPath = path.resolve(__dirname, "../");
        const footerComponentPath = path.join(
            projectRootPath,
            "src/components/Footer/component.tsx"
        );
        const galleryComponentPath = path.join(
            projectRootPath,
            "src/components/Gallery/component.tsx"
        );
        const headerComponentPath = path.join(
            projectRootPath,
            "src/components/Header/component.tsx"
        );
        const photoCardComponentPath = path.join(
            projectRootPath,
            "src/components/PhotoCard/component"
        );

        const FooterModule = await importModuleWithIgnoredErrors(
            footerComponentPath
        );
        Footer = FooterModule?.default;

        const GalleryModule = await importModuleWithIgnoredErrors(
            galleryComponentPath
        );
        Gallery = GalleryModule?.default;

        const HeaderModule = await importModuleWithIgnoredErrors(
            headerComponentPath
        );
        Header = HeaderModule?.default;

        const PhotoCardModule = await importModuleWithIgnoredErrors(
            photoCardComponentPath
        );
        PhotoCard = PhotoCardModule?.default;
    });

    describe("PhotoCard Component", () => {
        test("renders the photo card with props", () => {
            render(<PhotoCard photo={photo} />);

            expect(screen.getByText("New York")).toBeInTheDocument();

            const imgElement = screen.getByRole("img");
            expect(imgElement).toHaveAttribute(
                "src",
                "https://example.com/image.jpg"
            );

            expect(
                screen.getByText("A beautiful view of New York City.")
            ).toBeInTheDocument();
        });

        test("increments likes when the like button is clicked", () => {
            render(<PhotoCard photo={photo} />);

            expect(screen.getByText("0")).toBeInTheDocument();

            const likeButton = screen.getByRole("button");
            fireEvent.click(likeButton);

            expect(screen.getByText("1")).toBeInTheDocument();
            fireEvent.click(likeButton);

            expect(screen.getByText("2")).toBeInTheDocument();
        });
    });

    describe("Gallery Component", () => {
        test("renders a list of PhotoCard components", async () => {
            render(<App />);

            const photoCards = await screen.queryAllByTestId("photo-card");
            expect(photoCards.length).toBe(mockPhotos.length);

            mockPhotos.forEach((photo) => {
                expect(screen.getByText(photo.location)).toBeInTheDocument();
                expect(screen.getByText(photo.description)).toBeInTheDocument();
            });
        });
        jest.mock("../src/components/PhotoCard/__mock__/index", () => []);

        test('renders "No photos available" when the array is empty', () => {
            render(<Gallery />);
            expect(screen.getByText("No photos available")).toBeInTheDocument();

            const photoCards = screen.queryAllByTestId("photo-card");
            expect(photoCards.length).toBe(0);
        });

        test("renders no more than 4 photo cards per row when the screen width is 1280 pixels or larger", () => {
            global.innerWidth = 1280;
            global.dispatchEvent(new Event("resize"));

            render(<Gallery />);

            const photoCards = screen.queryAllByTestId("photo-card");

            const maxCardsPerRow = 4;
            let rowCount = 0;

            for (let i = 0; i < photoCards.length; i += maxCardsPerRow) {
                rowCount++;
                const rowCards = photoCards.slice(i, i + maxCardsPerRow);
                expect(rowCards.length).toBeLessThanOrEqual(maxCardsPerRow);
            }

            const expectedRows = Math.ceil(photoCards.length / maxCardsPerRow);
            expect(rowCount).toBe(expectedRows);
        });
        test("renders no more than 4 photo cards in a row", async () => {
            const mockPhotos = [
                { id: 1, location: 'Location 1', imageUrl: 'url1', description: 'Description 1' },
                { id: 2, location: 'Location 2', imageUrl: 'url2', description: 'Description 2' },
                { id: 3, location: 'Location 3', imageUrl: 'url3', description: 'Description 3' },
                { id: 4, location: 'Location 4', imageUrl: 'url4', description: 'Description 4' },
                { id: 5, location: 'Location 5', imageUrl: 'url5', description: 'Description 5' },
            ];

            render(<Gallery photos={mockPhotos} />);

            let rows = await screen.findAllByTestId("photo-card");
            const rows1 = [...rows].reduce((acc, card, index) => {
                const rowIndex = Math.floor(index / 4);
                if (!acc[rowIndex]) {
                    acc[rowIndex] = [];
                }
                acc[rowIndex].push(card);
                return acc;
            }, [] as HTMLElement[][]);

            rows1.forEach((row) => {
                expect(row.length).toBeLessThanOrEqual(4);
            });
        });
    });

    describe("Header Component", () => {
        it("should render Header component correctly", () => {
            render(<Header />);
            const element = screen.getByRole("heading");
            expect(element).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", () => {
            render(<Header />);
            const heading = screen.getByRole("heading");
            expect(heading.tagName).toBe("H1");
        });
        it("should have correct text in heading", async () => {
            render(<Header />);
            const heading = await screen.findByRole("heading");

            expect(heading.textContent?.trim()).toBe("Header Header");
        });
    });
    describe("Footer Component", () => {
        it("should render Footer component correctly", () => {
            render(<Footer />);
            const element = screen.getByRole("heading");
            expect(element).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", () => {
            render(<Footer />);
            const heading = screen.getByRole("heading");
            expect(heading.tagName).toBe("H1");
        });
        it("should have correct text in heading", async () => {
            render(<Footer />);
            const heading = await screen.findByRole("heading");

            expect(heading.textContent?.trim()).toBe("Footer Header");
        });
    });
});

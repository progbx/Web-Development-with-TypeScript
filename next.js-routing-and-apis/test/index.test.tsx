import path from "path";
import { importModuleWithIgnoredErrors } from "./utils";
import { render, screen, cleanup } from "@testing-library/react";
import {
  fetchAmericaCityById,
  fetchAsiaCityById,
  fetchEuropeCityById,

  fetchEuropeCities,
  fetchAmericaCities,
  fetchAsiaCities,
} from "src/app/lib/fetch-data";

import { notFound } from "next/navigation";
import { europeCities } from "../src/app/lib/data/europe-cities";
import { asiaCities } from "../src/app/lib/data/asia-cities";
import { americaCities } from "../src/app/lib/data/america-cities";

jest.mock("../src/app/lib/fetch-data");
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Next.js routing & APIs", () => {
  let projectRootPath: string;

  let fetchEuropeCityByIdMock: jest.Mock;
  let fetchAsiaCityByIdMock: jest.Mock;
  let fetchAmericaCityByIdMock: jest.Mock;
  let fetchEuropeCitiesMock: jest.Mock;
  let fetchAsiaCitiesMock: jest.Mock;
  let fetchAmericaCitiesMock: jest.Mock;

  let notFoundMock: jest.Mock;

  beforeEach(async () => {
    projectRootPath = path.resolve(__dirname, "../");

    fetchEuropeCityByIdMock = fetchEuropeCityById as jest.Mock;
    fetchAsiaCityByIdMock = fetchAsiaCityById as jest.Mock;
    fetchAmericaCityByIdMock = fetchAmericaCityById as jest.Mock;
    fetchEuropeCitiesMock = fetchEuropeCities as jest.Mock;
    fetchAsiaCitiesMock = fetchAsiaCities as jest.Mock;
    fetchAmericaCitiesMock = fetchAmericaCities as jest.Mock;

    notFoundMock = notFound as unknown as jest.Mock;

    notFoundMock.mockImplementation(() => {
      throw new Error("Not found");
    });

    fetchEuropeCitiesMock.mockReturnValue(Promise.resolve(europeCities));
    fetchAsiaCitiesMock.mockReturnValue(Promise.resolve(asiaCities));
    fetchAmericaCitiesMock.mockReturnValue(Promise.resolve(americaCities));
  });

  afterEach(cleanup);

  afterEach(() => {
    jest.clearAllMocks();
  })

  function getComponentPath(componentPathEnding: string): string {
    return path.join(projectRootPath, `src/app/${componentPathEnding}`);
  }

  describe("Step 1: Create nested routes.", () => {
    let HomePageComponentModule: any;
    let HomePageComponent: any;

    let ContinentsHomePageComponentModule: any;
    let ContinentsHomePageComponent: any;

    beforeEach(async () => {
      const homeComponentPath = getComponentPath("page.tsx");
      const continentsHomeComponentPath = getComponentPath(
        "continents/page.tsx"
      );

      HomePageComponentModule = await importModuleWithIgnoredErrors(
        homeComponentPath
      );
      ContinentsHomePageComponentModule = await importModuleWithIgnoredErrors(
        continentsHomeComponentPath
      );

      HomePageComponent = HomePageComponentModule?.default;
      ContinentsHomePageComponent = ContinentsHomePageComponentModule?.default;
    });

    it("should have a Home 'page.tsx' file", async () => {
      expect(HomePageComponentModule).not.toBe(null);
    });

    it("Home page component should have correct heading", async () => {
      render(<HomePageComponent />);

      const heading = await screen.findByRole("heading");

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");
      expect(heading.textContent).toBe("City Guide");
    });

    describe("Continents", () => {
      it("should have a Home 'continents/page.tsx' file", async () => {
        expect(ContinentsHomePageComponentModule).not.toBe(null);
      });

      it("Continents Home page component should have correct heading", async () => {
        render(<ContinentsHomePageComponent />);

        const heading = await screen.findByRole("heading");

        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe("H1");
        expect(heading.textContent).toBe("Choose your continent");
      });

      describe("Europe", () => {
        let PageComponentModule: any;
        let PageComponent: any;

        beforeEach(async () => {
          const componentPath = getComponentPath("continents/europe/page.tsx");
          PageComponentModule = await importModuleWithIgnoredErrors(
            componentPath
          );
          PageComponent = PageComponentModule?.default;
        });

        it("should have a 'continents/europe/page.tsx' file", async () => {
          expect(PageComponentModule).not.toBe(null);
        });

        it("Continents => Europe page component should have correct heading", async () => {
          render(await PageComponent());

          const heading = await screen.findByRole("heading");

          expect(heading).toBeInTheDocument();
          expect(heading.tagName).toBe("H2");
          expect(heading.textContent).toBe("Cities in Europe");
        });

        it("should fetch Europe cities", async () => {
          render(await PageComponent());

          expect(fetchEuropeCitiesMock).toHaveBeenCalled();
        });

        it("should render Europe cities", async () => {
          render(await PageComponent());

          const citiesList = await screen.findByRole("list");
          const cities = await screen.findAllByRole("listitem");

          expect(citiesList).toBeInTheDocument();
          expect(cities).toHaveLength(europeCities.length);
        });
      });

      describe("Asia", () => {
        let PageComponentModule: any;
        let PageComponent: any;

        beforeEach(async () => {
          const componentPath = getComponentPath("continents/asia/page.tsx");
          PageComponentModule = await importModuleWithIgnoredErrors(
            componentPath
          );
          PageComponent = PageComponentModule?.default;
        });

        it("should have a 'continents/asia/page.tsx' file", async () => {
          expect(PageComponentModule).not.toBe(null);
        });

        it("Continents => Asia page component should have correct heading", async () => {
          render(await PageComponent());

          const heading = await screen.findByRole("heading");

          expect(heading).toBeInTheDocument();
          expect(heading.tagName).toBe("H2");
          expect(heading.textContent).toBe("Cities in Asia");
        });

        it("should fetch Asia cities", async () => {
          render(await PageComponent());

          expect(fetchAsiaCities).toHaveBeenCalled();
        });

        it("should render Asia cities", async () => {
          render(await PageComponent());

          const citiesList = await screen.findByRole("list");
          const cities = await screen.findAllByRole("listitem");

          expect(citiesList).toBeInTheDocument();
          expect(cities).toHaveLength(asiaCities.length);
        });
      });

      describe("America", () => {
        let PageComponentModule: any;
        let PageComponent: any;

        beforeEach(async () => {
          const componentPath = getComponentPath("continents/america/page.tsx");
          PageComponentModule = await importModuleWithIgnoredErrors(
            componentPath
          );
          PageComponent = PageComponentModule?.default;
        });

        it("should have a 'continents/america/page.tsx' file", async () => {
          expect(PageComponentModule).not.toBe(null);
        });

        it("Continents => America page component should have correct heading", async () => {
          render(await PageComponent());

          const heading = await screen.findByRole("heading");

          expect(heading).toBeInTheDocument();
          expect(heading.tagName).toBe("H2");
          expect(heading.textContent).toBe("Cities in America");
        });

        it("should fetch America cities", async () => {
          render(await PageComponent());

          expect(fetchAmericaCities).toHaveBeenCalled();
        });

        it("should render America cities", async () => {
          render(await PageComponent());

          const citiesList = await screen.findByRole("list");
          const cities = await screen.findAllByRole("listitem");

          expect(citiesList).toBeInTheDocument();
          expect(cities).toHaveLength(americaCities.length);
        });
      });
    });
  });

  describe("Step 2: Build navigation.", () => {
    let NavMenuComponentModule: any;
    let NavMenuComponent: any;

    let LayoutComponent: any;

    beforeEach(async () => {
      const componentPath = getComponentPath("ui/nav-menu.tsx");
      const layoutcomponentPath = getComponentPath("continents/layout.tsx");

      NavMenuComponentModule = await importModuleWithIgnoredErrors(
        componentPath
      );
      NavMenuComponent = NavMenuComponentModule?.default;

      const LayoutComponentModule = await importModuleWithIgnoredErrors(
        layoutcomponentPath
      );
      LayoutComponent = LayoutComponentModule?.default;
    });

    it("should have a 'ui/nav-menu.tsx' file", async () => {
      expect(NavMenuComponentModule).not.toBe(null);
    });

    it("NavMenu component should have correct navigation links amount", async () => {
      render(<NavMenuComponent />);

      const navLinks = await screen.findAllByRole("link");

      expect(navLinks).toHaveLength(3);
    });

    it("links should be wrapped in a list", async () => {
      render(<NavMenuComponent />);

      const navLinks = await screen.findAllByRole("link");

      expect(navLinks[0].closest("li")).toBeTruthy();
      expect(navLinks[0].closest("ul")).toBeTruthy();
    });

    it("NavMenu component should have correct navigation links text", async () => {
      render(<NavMenuComponent />);

      const navLinks = await screen.findAllByRole("link");

      expect(navLinks.some((linkEl) => linkEl.textContent === "Europe")).toBe(
        true
      );
      expect(navLinks.some((linkEl) => linkEl.textContent === "Asia")).toBe(
        true
      );
      expect(navLinks.some((linkEl) => linkEl.textContent === "America")).toBe(
        true
      );
    });

    it("NavMenu component should have correct navigation links addresses", async () => {
      render(<NavMenuComponent />);

      const navLinks: HTMLLinkElement[] = await screen.findAllByRole("link");

      expect(
        navLinks.some((linkEl) => linkEl?.href.match(/continents\/europe/gi))
      ).toBe(true);
      expect(
        navLinks.some((linkEl) => linkEl?.href.match(/continents\/asia/gi))
      ).toBe(true);
      expect(
        navLinks.some((linkEl) => linkEl?.href.match(/continents\/america/gi))
      ).toBe(true);
    });

    it("should include NavMenu component in the continents layout", async () => {
      try {
        render(<LayoutComponent />);
      } catch {}
      const navMenu = await screen.findByRole("navigation");

      expect(navMenu).toBeInTheDocument();
    });
  });

  describe("Step 3: Create dynamic routes.", () => {
    let continentName: string;
    let cityPagePath: string;
    let notFoundPagePath: string;

    describe("europe", () => {
      beforeEach(() => {
        continentName = "europe";
        const basePath = getComponentPath(`continents/${continentName}/[id]`);
        cityPagePath = `${basePath}/page.tsx`;
        notFoundPagePath = `${basePath}/not-found.tsx`;

        fetchEuropeCityByIdMock.mockReturnValue(
          Promise.resolve({ id: "1", name: "Paris" })
        );
      });

      it("should create a dynamic route fot europe with [id]", async () => {
        const PageComponentModule = await importModuleWithIgnoredErrors(
          cityPagePath
        );

        expect(PageComponentModule).not.toBe(null);
      });

      it("should fetch city data for europe", async () => {
        const PageComponentModule = await importModuleWithIgnoredErrors(
          cityPagePath
        );

        const PageComponent = PageComponentModule?.default;

        render(await PageComponent({ params: { id: "1" } }));

        expect(fetchEuropeCityByIdMock).toHaveBeenCalledWith("1");
      });

      describe("not-found page", () => {
        beforeEach(() => {
          fetchEuropeCityByIdMock.mockReturnValue(Promise.resolve(undefined));
        });

        it("calls notFound when city is not found", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            cityPagePath
          );

          const PageComponent = PageComponentModule?.default;

          try {
            render(await PageComponent({ params: { id: "111" } }));
          } catch {}

          expect(notFoundMock).toHaveBeenCalled();
        });

        it("should create the not-found page", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            notFoundPagePath
          );

          expect(PageComponentModule).not.toBe(null);
        });

        it("should have correct heading", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            notFoundPagePath
          );

          const PageComponent = PageComponentModule?.default;

          render(<PageComponent />);

          const heading = await screen.findByRole("heading");

          expect(heading).toBeInTheDocument();
          expect(heading.tagName).toBe("H2");
          expect(heading.textContent).toBe(
            "There is no such city in the list."
          );
        });
      });
    });

    describe("asia", () => {
      beforeEach(() => {
        continentName = "asia";
        const basePath = getComponentPath(`continents/${continentName}/[id]`);
        cityPagePath = `${basePath}/page.tsx`;
        notFoundPagePath = `${basePath}/not-found.tsx`;

        fetchAsiaCityByIdMock.mockReturnValue(
          Promise.resolve({ id: "1", name: "Japan" })
        );
      });

      it("should create a dynamic route fot asia with [id]", async () => {
        const PageComponentModule = await importModuleWithIgnoredErrors(
          cityPagePath
        );

        expect(PageComponentModule).not.toBe(null);
      });

      it("should fetch city data for asia", async () => {
        const PageComponentModule = await importModuleWithIgnoredErrors(
          cityPagePath
        );

        const PageComponent = PageComponentModule?.default;

        render(await PageComponent({ params: { id: "1" } }));

        expect(fetchAsiaCityByIdMock).toHaveBeenCalledWith("1");
      });

      describe("not-found page", () => {
        beforeEach(() => {
          fetchAsiaCityByIdMock.mockReturnValue(Promise.resolve(undefined));
        });

        it("calls notFound when city is not found", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            cityPagePath
          );

          const PageComponent = PageComponentModule?.default;

          try {
            render(await PageComponent({ params: { id: "111" } }));
          } catch {}

          expect(notFoundMock).toHaveBeenCalled();
        });

        it("should create the not-found page", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            notFoundPagePath
          );

          expect(PageComponentModule).not.toBe(null);
        });

        it("should have correct heading", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            notFoundPagePath
          );

          const PageComponent = PageComponentModule?.default;

          render(<PageComponent />);

          const heading = await screen.findByRole("heading");

          expect(heading).toBeInTheDocument();
          expect(heading.tagName).toBe("H2");
          expect(heading.textContent).toBe(
            "There is no such city in the list."
          );
        });
      });
    });

    describe("america", () => {
      beforeEach(() => {
        continentName = "america";
        const basePath = getComponentPath(`continents/${continentName}/[id]`);
        cityPagePath = `${basePath}/page.tsx`;
        notFoundPagePath = `${basePath}/not-found.tsx`;

        fetchAmericaCityByIdMock.mockReturnValue(
          Promise.resolve({ id: "1", name: "New York" })
        );
      });

      it("should create a dynamic route fot america with [id]", async () => {
        const PageComponentModule = await importModuleWithIgnoredErrors(
          cityPagePath
        );

        expect(PageComponentModule).not.toBe(null);
      });

      it("should fetch city data for america", async () => {
        const PageComponentModule = await importModuleWithIgnoredErrors(
          cityPagePath
        );

        const PageComponent = PageComponentModule?.default;

        render(await PageComponent({ params: { id: "1" } }));

        expect(fetchAmericaCityByIdMock).toHaveBeenCalledWith("1");
      });

      describe("not-found page", () => {
        beforeEach(() => {
          fetchAmericaCityByIdMock.mockReturnValue(Promise.resolve(undefined));
        });

        it("calls notFound when city is not found", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            cityPagePath
          );

          const PageComponent = PageComponentModule?.default;

          try {
            render(await PageComponent({ params: { id: "111" } }));
          } catch {}

          expect(notFoundMock).toHaveBeenCalled();
        });

        it("should create the not-found page", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            notFoundPagePath
          );

          expect(PageComponentModule).not.toBe(null);
        });

        it("should have correct heading", async () => {
          const PageComponentModule = await importModuleWithIgnoredErrors(
            notFoundPagePath
          );

          const PageComponent = PageComponentModule?.default;

          render(<PageComponent />);

          const heading = await screen.findByRole("heading");

          expect(heading).toBeInTheDocument();
          expect(heading.tagName).toBe("H2");
          expect(heading.textContent).toBe(
            "There is no such city in the list."
          );
        });
      });
    });
  });
});

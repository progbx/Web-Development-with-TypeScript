import path from "path";
import { importModuleWithIgnoredErrors } from "./utils";
import { render, screen } from "@testing-library/react";
import { getComponentPath } from "./utils/getComponentPath";
import { createJobPosition } from "src/app/lib/actions";

try {
jest.mock("../src/app/ui/job/job-search", () => {
  return {
    __esModule: true,
    default: () => {
      return <h6>Job Search Mock</h6>;
    },
  };
});

jest.mock("../src/app/ui/job/job-info", () => {
  return {
    __esModule: true,
    default: () => {
      return <h6>Job Info Mock</h6>;
    },
  };
});

jest.mock("../src/app/ui/skeletons", () => {
  return {
    __esModule: true,
    JobsListSkeleton: () => {
      return <h6>JobsListSkeleton Mock</h6>;
    },
    JobInfoSkeleton: () => {
      return <h6>JobInfoSkeleton Mock</h6>;
    },
  };
});

jest.mock("../src/app/ui/job/jobs-list", () => {
  return {
    __esModule: true,
    default: () => {
      return <h6>JobsList Mock</h6>;
    },
  };
});

jest.mock("../src/app/lib/actions", () => {
  return {
    createJobPosition: "createJobPositionMockAction",
  };
});
} catch {}

describe("Next.js and Data Fetching", () => {
  let projectRootPath: string;

  let searchParamsProp: any;
  let query: string;

  beforeEach(async () => {
    query = "some_search_query";
    searchParamsProp = Promise.resolve({ query });

    projectRootPath = path.resolve(__dirname, "../");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Home Page", () => {
    let HomePageComponentModule: any;
    let HomePageComponent: any;

    beforeEach(async () => {
      const homeComponentPath = getComponentPath("page.tsx");

      HomePageComponentModule = await importModuleWithIgnoredErrors(
        homeComponentPath
      );

      HomePageComponent = HomePageComponentModule?.default;
    });

    it("should have a Home 'page.tsx' file", async () => {
      expect(HomePageComponentModule).not.toBe(null);
    });

    it("Home page component should have correct heading", async () => {
      render(<HomePageComponent />);

      const heading = await screen.findByRole("heading");

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe("Welcome to Job Search Website");
    });

    it("Home page component should have correct paragraph", async () => {
      render(<HomePageComponent />);

      const paragraph = await screen.findByText("Find your dream job here!");

      expect(paragraph).toBeInTheDocument();
      expect(paragraph.tagName).toBe("P");
    });

    it("Home page component should have a link to Job Search Page", async () => {
      render(<HomePageComponent />);

      const link = await screen.findByRole("link");

      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link.textContent).toBe("Go to Job Search Page");
      expect(link).toHaveAttribute("href", "/job");
    });
  });

  describe("Job Search Page", () => {
    let PageComponentModule: any;
    let PageComponent: any;

    let LayoutComponentModule: any;
    let LayoutComponent: any;

    beforeEach(async () => {
      const pageComponentPath = getComponentPath("job/page.tsx");
      const layoutComponentPath = getComponentPath("job/layout.tsx");

      PageComponentModule = await importModuleWithIgnoredErrors(
        pageComponentPath
      );
      LayoutComponentModule = await importModuleWithIgnoredErrors(
        layoutComponentPath
      );

      PageComponent = PageComponentModule?.default;
      LayoutComponent = LayoutComponentModule?.default;
    });

    describe("page & layout components", () => {
      it("should have a Job Search 'page.tsx' file", async () => {
        expect(PageComponentModule).not.toBe(null);
      });

      it("a page component should have correct heading", async () => {
        render(await PageComponent({ searchParams: searchParamsProp }));
        const heading = await screen.findByRole("heading", {
          name: "Job Search for All",
        });

        expect(heading).toBeInTheDocument();
      });

      it("should render a Job Search component", async () => {
        render(await PageComponent({ searchParams: searchParamsProp }));

        const jobSearch = await screen.findByText("Job Search Mock");

        expect(jobSearch).toBeInTheDocument();
      });

      it("should pass a query to JobList component", async () => {
        render(await PageComponent({ searchParams: searchParamsProp }));

        const jobList = await screen.findByText("JobsList Mock");

        expect(jobList).toBeInTheDocument();
      });

      it("should have a Job Search 'layout.tsx' file", async () => {
        expect(LayoutComponentModule).not.toBe(null);
      });

      it("a layout component should have a SideNav component", async () => {
        render(<LayoutComponent />);

        const sideNav = await screen.findByRole("navigation");

        expect(sideNav).toBeInTheDocument();
        expect(sideNav.tagName).toBe("NAV");
      });

      it("a layout Component should render children", async () => {
        render(
          <LayoutComponent>
            {await PageComponent({ searchParams: searchParamsProp })}
          </LayoutComponent>
        );

        const heading = await screen.findByRole("heading", {
          name: "Job Search for All",
        });

        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe("Job Search for All");
      });
    });
  });

  describe("Job Details Page", () => {
    let PageComponentModule: any;
    let PageComponent: any;

    beforeEach(async () => {
      const pageComponentPath = getComponentPath("job/[id]/page.tsx");

      PageComponentModule = await importModuleWithIgnoredErrors(
        pageComponentPath
      );

      PageComponent = PageComponentModule?.default;
    });

    it("should have a Job Details 'page.tsx' file", async () => {
      expect(PageComponentModule).not.toBe(null);
    });

    it("should render a heading", async () => {
      render(await PageComponent({ params: { id: "some_id" } }));

      const heading = await screen.findByRole("heading", {
        name: "Job Details",
      });

      expect(heading).toBeInTheDocument();
    });

    it("should render a Job Info component", async () => {
      render(await PageComponent({ params: { id: "some_id" } }));

      const jobInfo = await screen.findByText("Job Info Mock");

      expect(jobInfo).toBeInTheDocument();
    });
  });

  describe("Create a Job Page", () => {
    let PageComponentModule: any;
    let PageComponent: any;

    let createJobPositionMock: jest.Mock;

    beforeEach(async () => {
      const pageComponentPath = getComponentPath("job/create/page.tsx");
      createJobPositionMock = createJobPosition as jest.Mock;

      PageComponentModule = await importModuleWithIgnoredErrors(
        pageComponentPath
      );

      PageComponent = PageComponentModule?.default;
    });

    it("should have a Create Job 'page.tsx' file", async () => {
      expect(PageComponentModule).not.toBe(null);
    });

    it("should render a heading", async () => {
      render(<PageComponent />);

      const heading = await screen.findByRole("heading", {
        name: "Here you can create a job listing.",
      });

      expect(heading).toBeInTheDocument();
    });

    it("should have a jobTitle input field", async () => {
      render(<PageComponent />);

      const titleInput = await screen.findByLabelText("Job Title");

      expect(titleInput).toBeInTheDocument();
      expect(titleInput).toHaveAttribute("name", "jobTitle");
    });

    it("should have a shortDescription textarea field", async () => {
      render(<PageComponent />);

      const shortDescription = await screen.findByLabelText(
        "Short Description"
      );

      expect(shortDescription).toBeInTheDocument();
      expect(shortDescription).toHaveAttribute("name", "shortDescription");
    });

    it("should have a requirements textarea field", async () => {
      render(<PageComponent />);

      const requirements = await screen.findByLabelText("Requirements");

      expect(requirements).toBeInTheDocument();
      expect(requirements).toHaveAttribute("name", "requirements");
    });

    it("should have a submit button", async () => {
      render(<PageComponent />);

      const submitButton = await screen.findByRole("button", {
        name: "Create",
      });

      expect(submitButton).toBeInTheDocument();
    });

    it("error.tsx should exist for the route", async () => {
      const errorComponentPath = getComponentPath("job/create/error.tsx");

      const ErrorComponentModule = await importModuleWithIgnoredErrors(
        errorComponentPath
      );

      expect(ErrorComponentModule).not.toBe(null);
    });
  });
});

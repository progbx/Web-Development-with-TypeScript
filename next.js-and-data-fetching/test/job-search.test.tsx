import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getComponentPath } from "./utils/getComponentPath";
import { importModuleWithIgnoredErrors } from "./utils";
import { fetchJobsList } from "src/app/lib/data";
import { JobModel } from "src/app/lib/job.model";

jest.mock("../src/app/lib/data", () => {
  return {
    fetchJobsList: jest.fn(),
  };
});

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe("JobSearch page", () => {
  let useSearchParamsMock: jest.Mock;
  let usePathnameMock: jest.Mock;
  let useRouterMock: jest.Mock;
  let replaceMock: jest.Mock;
  let fetchJobsListMock: jest.Mock;

  let searchParams: any;

  beforeEach(async () => {
    searchParams = new URLSearchParams();
    replaceMock = jest.fn();

    useSearchParamsMock = useSearchParams as jest.Mock;
    usePathnameMock = usePathname as jest.Mock;
    useRouterMock = useRouter as jest.Mock;
    fetchJobsListMock = fetchJobsList as jest.Mock;

    useRouterMock.mockReturnValue({ replace: replaceMock });
    useSearchParamsMock.mockReturnValue(searchParams);
    usePathnameMock.mockReturnValue("/job");

    replaceMock = jest.fn();
    useRouterMock.mockReturnValue({ replace: replaceMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("JobSearch", () => {
    let JobSearchComponentModule: any;
    let JobSearchComponent: any;

    beforeEach(async () => {
      const jobSearchComponentPath = getComponentPath("ui/job/job-search.tsx");

      JobSearchComponentModule = await importModuleWithIgnoredErrors(
        jobSearchComponentPath
      );

      JobSearchComponent = JobSearchComponentModule?.default;
    });

    it("should have a Job Search 'ui/job/job-search.tsx' file", async () => {
      expect(JobSearchComponentModule).not.toBe(null);
    });

    it("should have a JobSearch component input and label", async () => {
      render(<JobSearchComponent />);

      const label = await screen.findByText("Search For Job");

      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");

      const input = await screen.findByRole("textbox");

      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
      expect(input).toHaveAttribute("type", "text");
      expect((label as any).htmlFor).toBeTruthy();
    });

    it("input and label should be linked with 'id' and 'htmlFor' attributes", async () => {
      render(<JobSearchComponent />);

      const label = await screen.findByText("Search For Job");
      const input = await screen.findByRole("textbox");

      expect((label as any).htmlFor).toBeTruthy();
      expect(input.id).toBeTruthy();
      expect((label as any).htmlFor).toBe(input.id);
    });

    it("should replace route when user changes value", async () => {
      render(<JobSearchComponent />);

      const input = await screen.findByRole("textbox");
      const value = "Software Engineer";

      fireEvent.change(input, { target: { value } });

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledTimes(1);
        expect(replaceMock).toHaveBeenCalledWith(
          "/job?query=Software+Engineer"
        );
      });
    });

    it("should replace route without query when no search query", async () => {
      // This line is required to set a defaultValue for the input
      searchParams.set("query", "Software Engineer");

      render(<JobSearchComponent />);

      const input = await screen.findByRole("textbox");
      const value = "";

      fireEvent.change(input, { target: { value } });

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledTimes(1);
        expect(replaceMock).toHaveBeenCalledWith("/job?");
      });
    });
  });

  describe("JobsList", () => {
    let JobsListComponentModule: any;
    let JobsListComponent: any;
    let query: string;

    beforeEach(async () => {
      const jobsListComponentPath = getComponentPath("ui/job/jobs-list.tsx");

      JobsListComponentModule = await importModuleWithIgnoredErrors(
        jobsListComponentPath
      );

      query = "Software Engineer";

      JobsListComponent = JobsListComponentModule?.default;
      const jobsListMock: JobModel[] = [
        {
          id: "job-1a2b3c",
          title: "Software Engineer",
          company: "Tech Corp",
          shortDescription: "Develop and maintain software applications.",
          fullDescription:
            "This is a full description for Software Engineer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
          requirements: [
            "Bachelor's degree in Computer Science or related field",
            "Experience with JavaScript and React",
            "Strong problem-solving skills",
          ],
        },
        {
          id: "job-4d5e6f",
          title: "Data Scientist",
          company: "Data Inc",
          shortDescription: "Analyze and interpret complex data sets.",
          fullDescription:
            "This is a full description for Data Scientist. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
          requirements: [
            "Bachelor's degree in Data Science or related field",
            "Experience with Python and R",
            "Strong analytical skills",
          ],
        },
        {
          id: "job-7g8h9i",
          title: "Product Manager",
          company: "Innovate LLC",
          shortDescription:
            "Oversee product development from ideation to launch.",
          fullDescription:
            "This is a full description for Product Manager. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
          requirements: [
            "Bachelor's degree in Business or related field",
            "Experience with product management",
            "Strong leadership skills",
          ],
        },
      ];

      fetchJobsListMock.mockReturnValue(Promise.resolve(jobsListMock));
    });

    it("should have a Jobs List 'ui/job/jobs-list.tsx' file", async () => {
      expect(JobsListComponentModule).not.toBe(null);
    });

    it("should get jobs list data", async () => {
      render(await JobsListComponent({ query }));

      expect(fetchJobsListMock).toHaveBeenCalledTimes(1);
      expect(fetchJobsListMock).toHaveBeenCalledWith(query);
    });

    it("should render an HTML list", async () => {
      render(await JobsListComponent({ query }));

      const list = screen.getByRole("list");

      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("UL");
    });

    it("should render a list item as an HTML list item", async () => {
      render(await JobsListComponent({ query }));

      const listItems = await screen.findAllByRole("listitem");
      const [listItem] = listItems;

      expect(listItems).toHaveLength(3);
      expect(listItem).toBeInTheDocument();
      expect(listItem.tagName).toBe("LI");
    });

    it("should render a list item with job title", async () => {
      render(await JobsListComponent({ query }));

      const listItems = await screen.findAllByRole("listitem");
      const [listItem] = listItems;

      const title = await screen.findByText("Software Engineer");

      expect(title).toBeInTheDocument();
      expect(listItem).toContainElement(title);
    });

    it("should render a list item with short description", async () => {
      render(await JobsListComponent({ query }));

      const listItems = await screen.findAllByRole("listitem");
      const [listItem] = listItems;

      const description = await screen.findByText(
        "Develop and maintain software applications."
      );

      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
      expect(listItem).toContainElement(description);
    });

    it("should render a list item with a link", async () => {
      render(await JobsListComponent({ query }));

      const listItems = await screen.findAllByRole("listitem");
      const [listItem] = listItems;

      const [link] = await screen.findAllByRole("link");

      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/job/job-1a2b3c");
      expect(listItem).toContainElement(link);
    });
  });
});

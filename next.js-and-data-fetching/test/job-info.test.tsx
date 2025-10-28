import { render, screen } from "@testing-library/react";
import { getComponentPath } from "./utils/getComponentPath";
import { importModuleWithIgnoredErrors } from "./utils";
import { fetchJobInfo } from "src/app/lib/data";
import { JobModel } from "src/app/lib/job.model";
import { notFound } from "next/navigation";

jest.mock("../src/app/lib/data", () => {
  return {
    fetchJobInfo: jest.fn(),
  };
});

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("JobInfo component", () => {
  let JobInfoComponentModule: any;
  let JobInfoComponent: any;
  let fetchJobInfoMock: jest.Mock;
  let notFoundMock: jest.Mock;

  let jobMock: JobModel;

  beforeEach(async () => {
    const jobInfoComponentPath = getComponentPath("ui/job/job-info.tsx");
    JobInfoComponentModule = await importModuleWithIgnoredErrors(
      jobInfoComponentPath
    );
    JobInfoComponent = JobInfoComponentModule?.default;

    fetchJobInfoMock = fetchJobInfo as jest.Mock;

    jobMock = {
      id: "1",
      title: "Job Title",
      fullDescription: "Job Description",
      shortDescription: "Job Short Description",
      requirements: ["Requirement 1", "Requirement 2"],
    };

    notFoundMock = notFound as unknown as jest.Mock;
    notFoundMock.mockImplementation(() => {
      throw new Error("Not found");
    });

    fetchJobInfoMock.mockReturnValue(Promise.resolve(jobMock));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a job info component file", async () => {
    expect(JobInfoComponentModule).not.toBeNull();
  });

  it("should render the job info heading", async () => {
    render(await JobInfoComponent({ id: jobMock.id }));

    const jobInfoHeading = await screen.findByRole("heading", {
      name: jobMock.title,
    });

    expect(jobInfoHeading).toBeInTheDocument();
  });

  it("should render the job info description", async () => {
    render(await JobInfoComponent({ id: jobMock.id }));

    const jobInfoDescription = await screen.findByText(jobMock.fullDescription);

    expect(jobInfoDescription).toBeInTheDocument();
  });

  it("should render the job info list of requirements", async () => {
    render(await JobInfoComponent({ id: jobMock.id }));

    const jobInfoRequirements = await screen.findAllByRole("listitem");

    expect(jobInfoRequirements).toHaveLength(jobMock.requirements.length);
    expect(jobInfoRequirements[0]).toHaveTextContent(jobMock.requirements[0]);
    expect(jobInfoRequirements[1]).toHaveTextContent(jobMock.requirements[1]);
  });

  it("should call notFound when a job is not found", async () => {
    fetchJobInfoMock.mockReturnValue(Promise.resolve(null));

    try {
      render(await JobInfoComponent({ id: "111" }));
    } catch {}

    expect(notFoundMock).toHaveBeenCalled();
  });
});

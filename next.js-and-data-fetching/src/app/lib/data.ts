import { JobModel } from "./job.model";
import jobsList from "./jobs-list";

function findJobById(id: string, jobs: JobModel[]): JobModel | null {
  return jobs.find((job) => job.id === id) || null;
}

function delayResponse<TData>(data: TData): Promise<TData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export const fetchJobsList = async (query?: string): Promise<JobModel[]> => {
  const filteredJobs = jobsList.filter((job) => {
    if (!query) {
      return true;
    }

    return job.title.toLowerCase().includes(query.toLowerCase());
  });

  return delayResponse(filteredJobs);
};

export const fetchJobInfo = async (id: string): Promise<JobModel | null> => {
  const job = jobsList.find((job) => job.id === id) || null;

  if (!job) {
    return null;
  }

  return delayResponse(job);
};

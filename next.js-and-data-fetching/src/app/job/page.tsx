import JobSearch from "../ui/job/job-search";
import JobsList from "../ui/job/jobs-list";

export default function JobPage({ searchParams }: { searchParams: { query?: string } }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Job Search for All</h1>
      <JobSearch />
      <JobsList searchParams={searchParams} />
    </>
  );
}

import JobInfo from "../../ui/job/job-info";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Job Details</h1>
      <JobInfo id={params.id} />
    </main>
  );
}

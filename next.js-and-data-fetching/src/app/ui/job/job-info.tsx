import { fetchJobInfo } from '../../lib/data';
import { JobModel } from '../../lib/job.model';
import { notFound } from 'next/navigation';

export default async function JobInfo({ id }: { id: string }) {
  const job: JobModel | null = await fetchJobInfo(id);

  if (!job) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      {job.company && <p className="text-gray-600 mb-4">{job.company}</p>}
      <p className="mb-4">{job.fullDescription}</p>
      {job.requirements.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc pl-6">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

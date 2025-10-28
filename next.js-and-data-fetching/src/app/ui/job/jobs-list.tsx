import Link from 'next/link';
import { fetchJobsList } from '../../lib/data';
import { JobModel } from '../../lib/job.model';

interface JobsListProps {
  query?: string;
  searchParams?: { query?: string };
}

export default async function JobsList({ query: queryProp, searchParams }: JobsListProps) {
  const query = queryProp || searchParams?.query || '';
  const jobs: JobModel[] = await fetchJobsList(query);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Jobs</h2>
      {jobs.length > 0 ? (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id} className="border rounded-lg p-4">
              <Link 
                href={`/job/${job.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {job.title}
              </Link>
              {job.company && <p className="text-gray-600 text-sm mt-1">{job.company}</p>}
              <p className="text-gray-500 text-xs mt-2">{job.shortDescription}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  );
}

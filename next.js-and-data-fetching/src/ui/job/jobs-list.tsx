export default function JobsList({ searchParams }: { searchParams: { query?: string } }) {
  return (
    <ul className="space-y-4">
      <li className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Sample Job</h2>
        <p className="mb-2">Sample Description</p>
        <a href="/job/1" className="text-blue-500 hover:underline">
          View Details
        </a>
      </li>
    </ul>
  );
}

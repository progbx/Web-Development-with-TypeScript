export default function JobInfo({ id }: { id: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sample Job Title</h2>
      <p className="mb-4">Sample job description</p>
      <ul className="list-disc pl-6">
        <li>Requirement 1</li>
        <li>Requirement 2</li>
      </ul>
    </div>
  );
}

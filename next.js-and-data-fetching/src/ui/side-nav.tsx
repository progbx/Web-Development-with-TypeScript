export default function SideNav() {
  return (
    <nav role="navigation" className="p-4 bg-gray-100 h-full">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <a href="/job" className="block p-2 hover:bg-gray-200 rounded">
            Job Search
          </a>
        </li>
        <li>
          <a href="/job/create" className="block p-2 hover:bg-gray-200 rounded">
            Create Job
          </a>
        </li>
      </ul>
    </nav>
  );
}

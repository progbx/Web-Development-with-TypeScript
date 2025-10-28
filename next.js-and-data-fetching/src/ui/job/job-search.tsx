"use client";

export default function JobSearch() {
  return (
    <form className="mb-6">
      <label htmlFor="job-search" className="block mb-2 font-medium">
        Search for a job
      </label>
      <input
        id="job-search"
        name="job-search"
        type="text"
        className="border rounded px-3 py-2 w-full"
        placeholder="Type job title..."
      />
    </form>
  );
}

import { createJobPosition } from "src/app/lib/actions";

export default function CreateJobForm() {
  return (
    <form action={createJobPosition} className="space-y-6 py-6">
      <div>
        <label htmlFor="new-job-title" className="block text-sm font-medium mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="new-job-title"
          name="jobTitle"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="new-job-short-description" className="block text-sm font-medium mb-1">
          Short Description
        </label>
        <textarea
          id="new-job-short-description"
          name="shortDescription"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="new-job-requirements" className="block text-sm font-medium mb-1">
          Requirements
        </label>
        <textarea
          id="new-job-requirements"
          name="requirements"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Create
      </button>
    </form>
  );
}

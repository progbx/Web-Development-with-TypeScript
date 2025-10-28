export default function CreateJobForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="jobTitle" className="block mb-1 font-medium">Job Title</label>
        <input id="jobTitle" name="jobTitle" type="text" className="border rounded px-3 py-2 w-full" required />
      </div>
      <div>
        <label htmlFor="shortDescription" className="block mb-1 font-medium">Short Description</label>
        <input id="shortDescription" name="shortDescription" type="text" className="border rounded px-3 py-2 w-full" required />
      </div>
      <div>
        <label htmlFor="requirements" className="block mb-1 font-medium">Requirements</label>
        <textarea id="requirements" name="requirements" className="border rounded px-3 py-2 w-full" required />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create</button>
    </form>
  );
}

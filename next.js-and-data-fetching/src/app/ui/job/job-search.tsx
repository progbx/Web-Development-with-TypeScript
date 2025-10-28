"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function JobSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("query") || "";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <form className="mb-6">
      <label htmlFor="job-search" className="block mb-2 font-medium">
        Search For Job
      </label>
      <input
        id="job-search"
        name="job-search"
        type="text"
        value={query}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        placeholder="Type job title..."
      />
    </form>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1 className="text-4xl text-center font-bold mb-4">
        Welcome to Job Search Website
      </h1>
      <p className="text-lg mb-8">Find your dream job here!</p>
      <Link
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        href="/job"
      >
        Go to Job Search Page
      </Link>
    </section>
  );
}

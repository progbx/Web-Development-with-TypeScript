import Link from "next/link";

export default function SideNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/job">Job Search</Link>
        </li>

        <li>
          <Link href="/job/create">Create a Job</Link>
        </li>
      </ul>
    </nav>
  );
}

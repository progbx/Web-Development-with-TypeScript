import Link from "next/link";

const continents = [
  { name: "Europe", path: "/continents/europe" },
  { name: "Asia", path: "/continents/asia" },
  { name: "America", path: "/continents/america" },
];

export default function NavMenu() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
        {continents.map((c) => (
          <li key={c.name}>
            <Link href={c.path}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

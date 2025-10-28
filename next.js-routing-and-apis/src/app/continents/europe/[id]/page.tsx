import { fetchEuropeCityById } from "../../../lib/fetch-data";
import { notFound } from "next/navigation";

export default async function EuropeCityPage({ params }: { params: { id: string } }) {
  const city = await fetchEuropeCityById(params.id);
  if (!city) return notFound();
  return (
    <div>
      <h1>{city.name}</h1>
    </div>
  );
}

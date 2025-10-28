import { fetchAsiaCities } from "../../lib/fetch-data";
import AsiaCityList from "../../ui/asia-city-list";

export default async function AsiaPage() {
  const cities = await fetchAsiaCities();
  return (
    <>
      <h2>Cities in Asia</h2>
      <AsiaCityList cities={cities} />
    </>
  );
}

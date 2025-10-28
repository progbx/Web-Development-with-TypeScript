import { fetchEuropeCities } from "../../lib/fetch-data";
import EuropeCityList from "../../ui/europe-city-list";

export default async function EuropePage() {
  const cities = await fetchEuropeCities();
  return (
    <>
      <h2>Cities in Europe</h2>
      <EuropeCityList cities={cities} />
    </>
  );
}

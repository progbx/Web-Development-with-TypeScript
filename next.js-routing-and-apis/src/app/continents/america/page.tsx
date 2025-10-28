import { fetchAmericaCities } from "../../lib/fetch-data";
import AmericaCityList from "../../ui/america-city-list";

export default async function AmericaPage() {
  const cities = await fetchAmericaCities();
  return (
    <>
      <h2>Cities in America</h2>
      <AmericaCityList cities={cities} />
    </>
  );
}

import { City } from "../lib/City.model";

export default function AsiaCityList({ cities }: { cities: City[] }) {
  return (
    <ul>
      {cities.map((city) => (
        <li key={city.id}>{city.name}</li>
      ))}
    </ul>
  );
}

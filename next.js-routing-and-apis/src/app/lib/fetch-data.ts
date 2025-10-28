import { City } from "./City.model";
import { americaCities } from "./data/america-cities";
import { asiaCities } from "./data/asia-cities";
import { europeCities } from "./data/europe-cities";

function findCityFromList(id: string, cities: City[]): City | undefined {
  return cities.find((city) => city.id === id);
}

function delayResponse<TData>(data: TData): Promise<TData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
}

// Europe
export async function fetchEuropeCities(): Promise<City[]> {
  return delayResponse(europeCities);
}

export async function fetchEuropeCityById(id: string): Promise<City | void> {
  const city = findCityFromList(id, europeCities);

  return delayResponse(city);
}

// Asia
export async function fetchAsiaCities(): Promise<City[]> {
  return delayResponse(asiaCities);
}

export async function fetchAsiaCityById(id: string): Promise<City | void> {
  const city = findCityFromList(id, asiaCities);

  return delayResponse(city);
}

// America
export async function fetchAmericaCities(): Promise<City[]> {
  return delayResponse(americaCities);
}

export async function fetchAmericaCityById(id: string): Promise<City | void> {
  const city = findCityFromList(id, americaCities);

  return delayResponse(city);
}

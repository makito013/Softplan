export interface countriesTypes {
  id: number;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  area: string;
  population: string;
  demonym: string;
}

export const countries: countriesTypes[] = [];

export const testCountries: countriesTypes[] = [
  {
    id: 1,
    name: 'Brasil',
    alpha2Code: 'BR',
    alpha3Code: 'BRA',
    area: '1000',
    capital: 'Capital do País',
    population: '1000000',
    demonym: '.com',
  },
];

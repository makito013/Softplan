import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    Country {
        name
        area
        capital
        population
        alpha2Code
        alpha3Code
        area
        population
        demonym
    }
  }
`;

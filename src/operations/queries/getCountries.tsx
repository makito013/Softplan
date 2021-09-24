import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries @client {
      id
      nome
      sigla2
      sigla3
      codigo
      capital
      area
      populacao
      tld
    }
  }
`;

import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import { countries, countriesTypes } from './util/countries';

const name = '';

export const loginVar: ReactiveVar<string> = makeVar<string>(
  name,
);

export const flagsVar = makeVar<countriesTypes[]>(
  countries,
);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        name: {
          read() {
            return loginVar();
          },
        },
        countries: {
          read() {
            // return flagsVar();
          },
        },
      },
    },
  },
});

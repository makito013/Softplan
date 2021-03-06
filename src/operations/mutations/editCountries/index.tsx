import { ReactiveVar } from '@apollo/client';
import { countriesTypes } from '../../../util/countries';

export default (flagsVar: ReactiveVar<countriesTypes[]>) => (values: countriesTypes) => {
  const countriesEdited = flagsVar()
    .map((country: countriesTypes) => (country.name === values.name ? values : country));

  flagsVar(countriesEdited);
  return (countriesEdited);
};

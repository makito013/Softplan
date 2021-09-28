import { ReactiveVar } from '@apollo/client';
import { countriesTypes } from '../../../util/countries';

export default (flagsVar: ReactiveVar<countriesTypes[]>) => (values: countriesTypes[]) => {
  const countriesEdited = values;

  flagsVar(countriesEdited);
  return (countriesEdited);
};

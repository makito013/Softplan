import editCountries from './editCountries';
import editName from './editName';
import { loginVar, flagsVar } from '../../cache';

export const allMutations = {
  editCountries: editCountries(flagsVar),
  editName: editName(loginVar),
};

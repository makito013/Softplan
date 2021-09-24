import { ReactiveVar } from '@apollo/client';
import { countriesTypes } from '../../../util/countries';

export default (flagsVar: ReactiveVar<countriesTypes[]>) => (id: number, values: countriesTypes) => {
  const todosWithEditedTodo = flagsVar()
    .map((country: countriesTypes) => (country.id === id ? values : country));

  flagsVar(todosWithEditedTodo);
};

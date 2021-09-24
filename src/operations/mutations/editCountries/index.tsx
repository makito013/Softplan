import { ReactiveVar } from '@apollo/client';
import { countriesTypes } from '../../../util/countries';

export default (flagsVar: ReactiveVar<countriesTypes[]>) => (values: countriesTypes) => {
  const todosWithEditedTodo = flagsVar()
    .map((country: countriesTypes) => (country.id === values.id ? values : country));

  flagsVar(todosWithEditedTodo);
};

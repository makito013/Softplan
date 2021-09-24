import { ReactiveVar } from '@apollo/client';

export default (loginVar: ReactiveVar<string>) => (name: string) => {
  loginVar(name);
};

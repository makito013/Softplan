import React, { FC } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { ApolloClient, ApolloProvider, useQuery } from '@apollo/client';
import FlagsTable from './pages/flags';
import Login from './pages/login';
import './App.css';
import { cache } from './cache';
import { GET_COUNTRIES } from './operations/queries/getCountries';
import { testCountries } from './util/countries';

export const client = new ApolloClient({
  uri: 'http://testefront.dev.softplan.com.br/',
  cache,
  connectToDevTools: true,
});

interface params {
  test: boolean,
}

const Routes: FC<params> = ({
  test,
}) => {
  const { loading, error, data: countries } = useQuery(GET_COUNTRIES);
  if (test === false) {
    return (
      <BrowserRouter basename="">
        <Switch>
          <Route path="/flags" component={() => <FlagsTable countries={countries?.Country} loading={loading} />} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter basename="">
      <Switch>
        <Route path="/flags" component={() => <FlagsTable countries={testCountries} loading={false} />} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

const App: FC<params> = ({
  test,
}) => (
  <ApolloProvider client={client}>
    <Routes test={test} />
  </ApolloProvider>
);

export default App;

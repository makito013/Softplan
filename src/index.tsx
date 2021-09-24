import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import App from './App';
import { cache } from './cache';

export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

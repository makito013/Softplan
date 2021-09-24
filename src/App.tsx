import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import FlagsTable from './pages/flags';
import Login from './pages/login';
import './App.css';

function App(): React.ReactElement {
  return (
    <BrowserRouter basename="">
      <Switch>
        <Route path="/flags" component={FlagsTable} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import history from './history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/Register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

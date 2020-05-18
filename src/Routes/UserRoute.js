import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from 'Utils/auth';

export default function ({ children, ...rest }) {
  return (
    <Route {...rest}>{loggedIn() ? children : <Redirect to="/login" />}</Route>
  );
}

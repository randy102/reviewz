import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from 'Utils/auth';

export default function ({ children, ...rest }) {
  if (!loggedIn()) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest}>{children}</Route>;
}

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn, getCurrentUser } from 'Utils/auth';

export default function ({ children, ...rest }) {
  if (!loggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!getCurrentUser().roles.some(({ role }) => role === 'ROLE_ADMIN')) {
    return <Redirect to="/" />;
  }

  return <Route {...rest}>{children}</Route>;
}

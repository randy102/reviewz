import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn, getCurrentUser } from 'Utils/auth';

export default function ({ children, ...rest }) {
  return (
    <Route {...rest}>
      {loggedIn() &&
      getCurrentUser().roles.some(({ role }) => role === 'ROLE_ADMIN') ? (
        children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
}

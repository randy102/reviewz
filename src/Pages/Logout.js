import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { logOut } from 'Utils/auth/index.js';
export default function Logout() {
  const history = useHistory();

  logOut();

  return <Redirect push to={history.location.prevPath || '/'} />;
}

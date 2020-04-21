import React from 'react';
import { loggedIn, getCurrentUser } from '../Utils/auth';
import { Redirect } from 'react-router-dom';

export default function guard(
  { authorization, role: requiredRole },
  props,
  Component
) {
  if (authorization) {
    try {
      if (!loggedIn()) throw new Error('Require login');

      if (requiredRole) {
        const { roles } = getCurrentUser();
        const hasPermission = roles.some(({ role }) => role === requiredRole);
        if (!hasPermission) throw new Error('No permission');
      }

      return <Component {...props} />;
    } catch (err) {
      console.log(err);
      return <Redirect push to="/login" />;
    }
  }
  return <Component {...props} />;
}

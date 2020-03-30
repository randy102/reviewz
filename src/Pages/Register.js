import React from 'react';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory();

  return (
    <div className="register-page">
      <h1>Register Page</h1>
      <button onClick={() => history.push('/')}>Back to Home</button>
    </div>
  )
}
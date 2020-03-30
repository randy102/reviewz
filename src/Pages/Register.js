import React from 'react';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory()
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => history.push('/')}>
        Go back to Home Page</button>
    </div>
  )
}
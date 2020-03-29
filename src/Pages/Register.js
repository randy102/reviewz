import React from 'react';
import history from '../history';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => history.go(-1)}>
        Go back to Home Page</button>
    </div>
  )
}
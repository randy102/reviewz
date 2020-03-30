import React from 'react';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory()
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => history.go(-1)}>
        Go back to Home Page</button>
    </div>
  )
}
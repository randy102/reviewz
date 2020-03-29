import React from 'react';
import history from '../history';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => history.push('/About')}>
        Testing Router - Go to About page
      </button>
    </div>
  );
}

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from 'Components/Shared/Header';

import Welcome from 'Components/Welcome';

import 'SCSS/Reset.scss';

export default function Home() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
      </Switch>
    </>
  );
}

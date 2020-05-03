import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'Components/Main/Header';

import Welcome from 'Components/Main/Welcome';

import 'SCSS/Reset.scss';

export default function Home() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

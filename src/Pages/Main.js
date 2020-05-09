import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from 'Components/Main/Header';
import Footer from 'Components/Main/Footer';
import Welcome from 'Components/Main/Welcome';
import Search from 'Components/Main/Search';
import MovieDetails from 'Components/Main/MovieDetails';

import 'SCSS/Reset.scss';

export default function Main() {
  return (
    <React.Fragment>
      <Header />

      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route exact path="/movie/:id">
          <MovieDetails />
        </Route>
      </Switch>

      <Footer />
    </React.Fragment>
  );
}

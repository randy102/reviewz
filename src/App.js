import React, { useState, useEffect, Suspense } from 'react';
import 'antd/dist/antd.css';
import './SCSS/Reset.scss';
import { useRequest } from 'Utils/request';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GenresContext } from 'Components/Shared/GenresContext';
import AdminRoute from 'Routes/AdminRoute';
import UserRoute from 'Routes/UserRoute';
import Loading from 'Pages/Loading';

const Admin = React.lazy(() => import('Pages/Admin'));
const Logout = React.lazy(() => import('Pages/Logout'));
const Main = React.lazy(() => import('Pages/Main'));

export default function App() {
  const [genres, setGenres] = useState();

  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Get genres error:', error);
    },
    onResponse: response => {
      setGenres(
        response.data.reduce((genres, current) => {
          genres[current.id] = current.name;
          return genres;
        }, {})
      );
    },
  });

  useEffect(() => {
    sendRequest({
      api: 'category',
      method: 'GET',
    });
  }, []);

  return (
    <GenresContext.Provider value={genres}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <AdminRoute path="/admin">
              <Admin />
            </AdminRoute>

            <UserRoute path="/logout">
              <Logout />
            </UserRoute>

            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </GenresContext.Provider>
  );
}

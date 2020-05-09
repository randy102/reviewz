import React, { useState, useEffect } from 'react';
import AppProvider from './Utils/provider';
import Routes from './Routes/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SCSS/Reset.scss';
import { useRequest } from 'Utils/request';

import { GenresContext } from 'Components/Shared/GenresContext';

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
      <AppProvider>
        <Routes />
      </AppProvider>
    </GenresContext.Provider>
  );
}

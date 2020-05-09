import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useRequest } from 'Utils/request';

export default function Movies(props) {
  const history = useHistory();

  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      console.log('Search movies error:', error);
    },
    onResponse: response => {
      console.log('Filter response:', response);
    },
  });

  useEffect(() => {
    sendRequest({
      api: `movie/filter?keyword=${history.location.input}`,
      method: 'GET',
    });
  }, []);

  return <div>{history.location.input}</div>;
}

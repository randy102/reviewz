import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useRequest } from 'Utils/request';
import queryString from 'query-string';

export default function Movies(props) {
  const history = useHistory();

  const queries = queryString.parse(history.location.search);

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
      api: `movie/filter?${queryString.stringify(queries)}`,
      method: 'GET',
    });
  }, []);

  return <div>{queries.keyword}</div>;
}

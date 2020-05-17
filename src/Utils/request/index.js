// import useAxios from 'axios-hooks';
import axios from 'axios';
import { getToken } from 'Utils/auth/index';
import { useState, useEffect } from 'react';
import useIsMounted from 'ismounted';

export function useRequest(props) {
  const {
    onError = error => console.log('An error occurred:', error),
    onResponse = response => response,
    onLoading = loading => loading,
  } = props;

  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState();

  // Component is still mounted or not
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!response) return;

    onResponse(response);
  }, [response]);

  useEffect(() => {
    if (!error) return;

    onError(error);
  }, [error]);

  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  function fetch(fetchConfigs) {
    if (fetchConfigs !== undefined) setConfigs(fetchConfigs);

    if (!fetchConfigs && !configs) {
      throw new Error(
        'Please call fetch for the first time with configs before using refetch.'
      );
    }

    const { method, api, data } = fetchConfigs || configs;

    setLoading(true);

    axios({
      url: `${process.env.REACT_APP_BACKEND}/${api}`,
      method,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => {
        if (isMounted.current) {
          setResponse(res);
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted.current) {
          setError(error.response.data);
          setLoading(false);
        }
      });
  }

  const refetch = () => fetch();

  return [fetch, { loading, refetch }];
}

import axios from 'axios';
import { getToken } from 'Utils/auth/index';
import { useState, useEffect } from 'react';
import useIsMounted from 'ismounted';

export function useRequest(props) {
  const {
    onError = error => console.log('An error occurred:', error),
    onResponse = response => response,
    onLoading = () => null,
  } = props;

  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState();

  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  // Component is still mounted or not
  const isMounted = useIsMounted();

  async function fetch(fetchConfigs) {
    if (fetchConfigs !== undefined) setConfigs(fetchConfigs);

    if (!fetchConfigs && !configs) {
      throw new Error(
        'Please call fetch for the first time with configs before using refetch.'
      );
    }

    const { method, api, data } = fetchConfigs || configs;

    setLoading(true);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND}/${api}`,
        method,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (isMounted.current) {
        onResponse(response);
      }
    } catch (error) {
      if (isMounted.current) {
        onError(error.response?.data || error);
      }
    }

    setLoading(false);
  }

  const refetch = () => fetch();

  return [fetch, { loading, refetch }];
}

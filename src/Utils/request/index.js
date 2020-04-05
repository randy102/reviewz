import useAxios from 'axios-hooks';

import { getToken } from 'Utils/auth/index';

export function useRequest({ method, api, data = {} }) {
  const [{ data: fetched, error, loading }, refetch] = useAxios({
    url: process.env.REACT_APP_BACKEND + api,
    method,
    data,
    headers: {
      Authorization: `Bearer ${getToken()}` || ''
    }
  });

  return { data: fetched, error, loading, refetch };
}

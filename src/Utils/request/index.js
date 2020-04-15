import useAxios from 'axios-hooks';
import axios from 'axios'
import { getToken } from 'Utils/auth/index';
import { useState, useEffect } from 'react';

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

export function useLazyRequest(configsParam) {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [configs, setConfigs] = useState()

  useEffect(()=>{
    setConfigs(configsParam)
  }, [])

  function fetch(fetchConfigs) {
    if(fetchConfigs !== undefined)
      setConfigs(fetchConfigs)

    if(!fetchConfigs && !configs){
      throw new Error("Please set configs before using refetch.")
    }

    const { method, api, data } = fetchConfigs || configs

    setLoading(true)

    axios({
      url: process.env.REACT_APP_BACKEND + api,
      method,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}` || ''
      }
    })
    .then(res => {
      setData(res)
      setLoading(false)
    })
    .catch(error => {
      setError(error && error.response.data)
      setLoading(false)
    })
  }

  return [fetch, {data, loading, error, refetch: () => fetch()}]
}
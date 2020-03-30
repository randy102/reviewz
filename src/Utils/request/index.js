import useAxios from 'axios-hooks'

export function useRequest({ method, api, data = {} }) {
  return useAxios({
    url: process.env.REACT_APP_BACKEND + api,
    method,
    data
  })
}
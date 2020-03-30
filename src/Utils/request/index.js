import useAxios from 'axios-hooks'

export function useRequest({ method, api, data = {} }) {
  const [{data: fetched, error, loading}, refetch] = useAxios({
    url: process.env.REACT_APP_BACKEND + api,
    method,
    data
  })

  return {data: fetched,error,loading,refetch}
}
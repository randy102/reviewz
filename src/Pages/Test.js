import React from 'react'
import { useLazyRequest } from '../Utils/request'

export default function Test() {
  const [login, { data, loading, error, refetch }] = useLazyRequest();

  if (data) {
    console.log("data: ", data.data);
  }

  if (error) {
    console.log("error:", error.message)
  }

  if (loading) {
    console.log("loading")
  }

  return (
    <div>
      <div onClick={() => login({
        api: "user/login",
        method: "POST",
        data: {
          username: "admin1",
          password: "123456"
        }
      })}>
        Fetch
      </div>

      <div onClick={() => refetch()}>
        Refetch
     </div>
    </div>

  )
}

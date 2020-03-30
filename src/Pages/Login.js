import React from 'react'
import {setToken, isLogin} from '../Utils/auth'
import { Redirect } from 'react-router-dom'
import { useRequest } from 'Utils/request'

export default function Login() {
  
  const {data, error, loading, refetch} = useRequest({
    api: "user/login",
    method: "POST",
    data: {
      username: "admin",
	    password: "12345"
    }
  })
  
  if(isLogin()) return <Redirect push to="/"/>
  
  if(data){
    setToken(data)
  }

  return (
    <div>
      {!loading && "Logged in!"}
    </div>
  )
}

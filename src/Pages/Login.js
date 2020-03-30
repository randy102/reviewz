import React from 'react'
import axios from 'axios'
import {setToken, isLogin} from '../Utils/auth'
import { Redirect } from 'react-router-dom'

export default function Login() {
  if(isLogin()) return <Redirect push to="/"/>
  axios({
    url: "https://review-movie-project.herokuapp.com/api/user/login",
    method: "POST",
    data: {
      username: "admin",
	    password: "12345"
    }
  })
  .then(res => {
    setToken(res.data)
  })
  return (
    <div>
      Login
    </div>
  )
}

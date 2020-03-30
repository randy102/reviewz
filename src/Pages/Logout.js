import React from 'react'
import {Redirect} from 'react-router-dom'
import {logOut} from 'Utils/auth'
export default function Logout() {
  logOut()
  return <Redirect push to="/"/>
}

import React from 'react'
import {verifyToken, isLogin} from '../Utils/auth'
import { Redirect } from 'react-router-dom'

export default function guard(isAuth, props, Component) {
  if(isAuth){
    try{
      if(!isLogin) throw new Error("Require login")

      if(!verifyToken) throw new Error("Token invalid")

      return <Component {...props}/>

    }
    catch(err){
      return <Redirect push to="/login" />
    }
  }
  return <Component {...props}/>
}

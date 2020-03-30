import React from 'react'
import {isLogin} from '../Utils/auth'
import { Redirect } from 'react-router-dom'

export default function guard(isAuth, props, Component) {
  
  if(isAuth){
    try{
      if(!isLogin()) throw new Error("Require login")

      return <Component {...props}/>

    }
    catch(err){
      return <Redirect push to="/login" />
    }
  }
  return <Component {...props}/>
}

import * as jwt from 'jsonwebtoken'

export function getToken(){
  return localStorage.getItem("access-token")
}

export function setToken(token){
  return localStorage.setItem("access-token", token)
}

export function getCurrentUser(){
  const token = getToken()
  return jwt.decode(token)
}

export function logOut(){
  localStorage.removeItem("access-token")
}

export function loggedIn(){
  return !!getToken()
}
import React from 'react'
import {useRequest} from '../Utils/request'

export default function Test() {
  const {data, error, loading, refetch} = useRequest({
    api: "user/login",
    method: "POST",
    data: {
      username: "adminf",
	    password: "12345"
    }
  });

  if(data){
    console.log("data: ", data)
  }

  if(error){
    console.log("error: ", error)
  }

  if(loading)
    console.log('loading')

  return (
    <div onClick={()=>refetch()}>
     Test
    </div>
  )
}

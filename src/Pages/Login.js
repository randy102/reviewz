import React, { useState, useRef } from 'react';
import {setToken, isLogin} from '../Utils/auth'
import { Redirect } from 'react-router-dom'
import { useRequest } from 'Utils/request'

import { useHistory } from 'react-router-dom';

import { Icon } from '@iconify/react'; 
import accountCircle from '@iconify/icons-mdi/account-circle';
import shieldLock from '@iconify/icons-mdi/shield-lock';

import 'SCSS/Form.scss';

export default function Login() {

  const history = useHistory();

  // const {data, error, loading, refetch} = useRequest({
  //   api: "user/login",
  //   method: "POST",
  //   data: {
  //     username: "admin",
	//     password: "12345"
  //   }
  // })
  
  // if(isLogin()) return <Redirect push to="/"/>
  
  // if(data){
  //   setToken(data)
  // }

  const usernameRef = useRef();
  const passwordRef = useRef();

  function inputRow(icon, placeholder, inputRef) {
    return (
      <div className="row">
        <Icon className="icon" icon={icon} />
        <input ref={inputRef} placeholder={placeholder} type="text"></input>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
  }

  return (
    <div className="form-page">
      <div className="brand-name">Reviewz</div>
      <div className="form">
        <div className="header">
          Đăng nhập
        </div>
        <form onSubmit={handleSubmit} className="grid">
          {inputRow(accountCircle, "Tên đăng nhập", usernameRef)}
          {inputRow(shieldLock, "Mật khẩu", passwordRef)}
          <button type="submit">
            Đăng nhập
          </button>
          <div className="alternate-link">
            <span>Chưa có tài khoản? </span>
            <a href="/register">Đăng ký</a>
          </div>
        </form>
        <a href="/" className="back-to-home">
          <span> Trở về trang chủ</span>
        </a>
      </div>
    </div>
  )
}

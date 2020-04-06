import React, { useState, useRef } from 'react';
import { setToken, isLogin } from '../Utils/auth';
import { Redirect, Link } from 'react-router-dom';
import { useRequest } from 'Utils/request';

import { Helmet } from 'react-helmet';

import { useHistory } from 'react-router-dom';

import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';

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
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(username, password);
  }

  return (
    <div className="form-page">

      <Helmet>
        <title>Reviewz | Đăng nhập</title>
      </Helmet>

      <div className="brand-name">Reviewz</div>

      <div className="form">
        <div className="header">Đăng nhập</div>

        <form onSubmit={handleSubmit} className="grid">
          {inputRow(accountCircle, 'Tên đăng nhập', usernameRef)}

          {inputRow(lockOpen, 'Mật khẩu', passwordRef)}

          <button type="submit">Đăng nhập</button>

          <div className="alternate-link">
            <span>Chưa có tài khoản? </span>
            <Link to="/register">Đăng ký</Link>
          </div>
        </form>

        <Link to="/" className="back-to-home">
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}

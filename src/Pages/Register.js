import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Icon } from '@iconify/react'; 
import accountCircle from '@iconify/icons-mdi/account-circle';
import shieldLock from '@iconify/icons-mdi/shield-lock';

import 'SCSS/Form.scss';

export default function About() {
  const history = useHistory();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = passwordRef.current.value;
  }

  return (
    <div className="form-page">
      <div className="brand-name">Reviewz</div>
      <div className="form">
        <div className="header">
          Đăng ký
        </div>
        <form onSubmit={handleSubmit} className="grid">
          {inputRow(accountCircle, "Tên đăng nhập", usernameRef)}
          {inputRow(shieldLock, "Mật khẩu", passwordRef)}
          {inputRow(shieldLock, "Xác nhận mật khẩu", confirmPasswordRef)}
          <button type="submit">
            Đăng ký
          </button>
          <div className="alternate-link">
            <span>Đã có tài khoản? </span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
        <Link to="/" className="back-to-home">
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  )
}
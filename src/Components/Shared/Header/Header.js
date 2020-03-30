import React from 'react';

import SearchBar from './SearchBar';
import Brand from './Brand';
import { FilledButton2, OutlinedButton2 } from '../Buttons';
import { useHistory } from 'react-router-dom';

import 'SCSS/Home/Header/Header.scss'

export default function Header() {
  const history = useHistory();

  function goToLogin() {
    history.push('/login');
  }

  function goToRegister() {
    history.push('/register');
  }

  return (
    <div className="header">
      <div className="top-container">
        <div className="top-content">
          <Brand />
          <SearchBar />
          <div className="buttons">
            <FilledButton2
              onClick={goToLogin}
              text="Đăng nhập"
              marginRight="30px"
            />
            <OutlinedButton2
              onClick={goToRegister}
              text="Đăng ký"
            />
          </div>
        </div>
      </div>
      <div className="genres-container">
        <div className="genres-content">

        </div>
      </div>
    </div>
  );
}

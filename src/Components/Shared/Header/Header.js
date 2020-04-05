import React, { useState } from 'react';

import SearchBar from './SearchBar';
import Brand from './Brand';
import Genres from './Genres';
import { FilledButton2, OutlinedButton2 } from 'Components/Shared/Buttons';
import { useHistory } from 'react-router-dom';

import { isLogin } from 'Utils/auth';

import 'SCSS/Header.scss';

export default function Header() {
  const history = useHistory();

  function login() {
    history.push('/login');
  }

  function logout() {
    history.push('/logout');
  }

  function register() {
    history.push('/register');
  }

  function write() {
    history.push('/');
  }

  return (
    <div className="header">
      <div className="top-container">
        <div className="top-content">
          <Brand />
          <SearchBar />

          <div className="buttons">
            <FilledButton2 onClick={write} text="Viết review" />

            {isLogin() ? (
              <OutlinedButton2 onClick={logout} text="Đăng xuất" />
            ) : (
              <>
                <OutlinedButton2 onClick={login} text="Đăng nhập" />
                <OutlinedButton2 onClick={register} text="Đăng ký" />
              </>
            )}
          </div>
        </div>
      </div>
      <Genres />
    </div>
  );
}

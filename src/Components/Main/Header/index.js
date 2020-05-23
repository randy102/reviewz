import React from 'react';

import SearchBar from './SearchBar';
import Brand from './Brand';
import Genres from './Genres';
import UserDropdown from './UserDropdown';
import { OutlinedButton } from 'Components/Shared/Buttons';
import { useHistory } from 'react-router-dom';

import { loggedIn } from 'Utils/auth';

import styles from 'SCSS/Header.module.scss';

export default function Header() {
  const history = useHistory();

  function login() {
    history.push({
      pathname: '/login',
      prevPath: history.location.pathname,
    });
  }

  function register() {
    history.push({
      pathname: '/register',
      prevPath: history.location.pathname,
    });
  }

  return (
    <div className={styles.header}>
      <div className={styles.top_container}>
        <div className={styles.top_content}>
          <Brand />
          <SearchBar />

          <div className={styles.buttons}>
            {loggedIn() ? (
              <UserDropdown />
            ) : (
              <React.Fragment>
                <OutlinedButton onClick={login} text="Đăng nhập" />
                <OutlinedButton onClick={register} text="Đăng ký" />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <Genres />
    </div>
  );
}

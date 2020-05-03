import React from 'react';

import SearchBar from './SearchBar';
import Brand from './Brand';
import Genres from './Genres';
import UserDropdown from './UserDropdown';
import { OutlinedButton2 } from 'Components/Shared/Buttons';
import { useHistory } from 'react-router-dom';

import { loggedIn } from 'Utils/auth';

import styles from 'SCSS/Header.module.scss';

export default function Header() {
  const history = useHistory();

  function login() {
    history.push('/login');
  }

  function register() {
    history.push('/register');
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

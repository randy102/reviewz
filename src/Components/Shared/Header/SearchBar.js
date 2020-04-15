import React, { useRef } from 'react';

import {useHistory} from 'react-router-dom';

import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-uil/search';

import styles from 'SCSS/Header.module.scss';

export default function SearchBar() {

  const history = useHistory();

  const inputRef = useRef();

  function handleSearch(event) {
    event.preventDefault();
    console.log('Input value:', inputRef.current.value);
    console.log('Current path:', history.location.pathname);
  }

  return (
    <form onSubmit={handleSearch} className={styles.search_bar}>
      <input ref={inputRef} placeholder="Tìm phim..."></input>

      <button type="submit">
        <Icon onClick={handleSearch} icon={searchIcon} />
      </button>
    </form>
  );
}

import React, { useRef } from 'react';

import history from '../../../history';

import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-uil/search';

export default function SearchBar() {
  const inputRef = useRef();

  function handleSearch(event) {
    event.preventDefault();
    console.log('Input value:', inputRef.current.value);
    console.log('Current path:', history.location.pathname);
  }

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input ref={inputRef} placeholder="Tìm phim..."></input>

      <button type="submit">
        <Icon onClick={handleSearch} icon={searchIcon} />
      </button>
    </form>
  );
}

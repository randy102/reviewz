import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';

import searchIcon from '@iconify/icons-uil/search';

import styles from 'SCSS/Header.module.scss';
import { IconButton } from 'Components/Shared/Buttons';
import { useForm } from 'react-hook-form';

export default function SearchBar() {
  const history = useHistory();

  const { register: formRef, handleSubmit } = useForm();

  function onSubmit({ search }) {
    history.push({
      pathname: '/search',
      input: search,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.search_bar}>
      <input name="search" ref={formRef} placeholder="Tìm phim..."></input>

      <button type="submit">
        <IconButton icon={searchIcon} />
      </button>
    </form>
  );
}

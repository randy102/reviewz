import React from 'react';

import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import searchIcon from '@iconify/icons-uil/search';

// import styles from 'SCSS/Header.module.scss';
import { IconButton } from 'Components/Shared/Buttons';
import { useForm } from 'react-hook-form';
import { css } from 'emotion';
import colors from 'Components/Shared/colors';

const styles = {
  container: css`
    display: flex;
    flex: 1 1 auto;
    max-width: 40%;
    background: ${colors.white};
    align-items: center;
    justify-content: space-between;
    border-radius: 50px;
  `,
  input: css`
    flex: 1 1 auto;
    margin-left: 15px;
    min-width: 0px;
  `,
  button: css`
    margin: 5px;
    background: transparent;
    transform: rotate(90deg);
    color: ${colors.primary};
    transition: all 0.5s;

    &:focus {
      outline: none;
    }
  `,
};

export default function SearchBar() {
  const history = useHistory();

  const queries = queryString.parse(history.location.search);

  const { register: formRef, handleSubmit } = useForm();

  function onSubmit({ search }) {
    if (!search) return;

    queries.keyword = search;

    history.push(`/search/?${queryString.stringify(queries)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <input
        className={styles.input}
        name="search"
        ref={formRef}
        placeholder="Tìm phim..."
      ></input>

      <button className={styles.button} type="submit">
        <IconButton icon={searchIcon} />
      </button>
    </form>
  );
}

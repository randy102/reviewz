import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import searchIcon from '@iconify/icons-uil/search';

import { IconButton } from 'Components/Shared/Buttons';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';

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
    border: none;
    outline: none;
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
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  const history = useHistory();

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      history.push(`/search/${value ? `?keyword=${value}` : ''}`);
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Tìm phim..."
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <Link
        to={`/search/${value ? `?keyword=${value}` : ''}`}
        className={styles.button}
      >
        <IconButton icon={searchIcon} />
      </Link>
    </div>
  );
}

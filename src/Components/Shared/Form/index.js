import React from 'react';

import Loading from 'Components/Shared/Loading';

import styles from 'SCSS/Form.module.scss';
import { cx } from 'emotion';

export function Form(props) {
  const { onSubmit, style, children, className } = props;

  return (
    <form
      onSubmit={onSubmit}
      className={cx(styles.grid, className)}
      style={style}
    >
      {children}
    </form>
  );
}

export function SubmitButton(props) {
  const { text, loading, className } = props;

  return (
    <button className={className} type="submit">
      {loading ? <Loading /> : text}
    </button>
  );
}

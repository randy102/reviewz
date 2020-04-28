import React from 'react';

import Loading from 'Components/Shared/Loading';

import styles from 'SCSS/Form.module.scss';

export function Form(props) {
  const { onSubmit, style, children } = props;

  return (
    <form
      onSubmit={onSubmit}
      className={styles.grid}
      style={
        style || {
          margin: 0,
        }
      }
    >
      {children}
    </form>
  );
}

export function SubmitButton(props) {
  const { text, loading } = props;

  return <button type="submit">{loading ? <Loading /> : text}</button>;
}

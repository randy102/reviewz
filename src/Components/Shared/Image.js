import React, { useState } from 'react';
import { css, cx } from 'emotion';
import colors from './theme';

const styles = {
  container: css`
    width: 100%;
    height: 100%;
    background: ${colors.imgPlaceholder};
  `,
  img: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `,
  loading: css``,
};

export default function Image({
  id,
  className,
  loading = false,
  loadingComponent,
  src,
  ...rest
}) {
  return (
    <div className={cx(styles.container, className)}>
      {(id || src) && (
        <img
          src={src || `${process.env.REACT_APP_BACKEND}/image/${id}`}
          className={styles.img}
          alt=""
          {...rest}
        />
      )}
      {loading && loadingComponent}
    </div>
  );
}

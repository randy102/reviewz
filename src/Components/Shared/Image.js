import React from 'react';
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
};

export default function Image({ id, className, ...rest }) {
  return (
    <div className={styles.container}>
      <img
        src={`${process.env.REACT_APP_BACKEND}/image/${id}`}
        className={cx(styles.img, className)}
        alt=""
        {...rest}
      />
    </div>
  );
}

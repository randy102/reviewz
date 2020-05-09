import React from 'react';
import { css } from 'emotion';

export default function Image({ id, ...rest }) {
  const style = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `;

  return (
    <img
      src={`${process.env.REACT_APP_BACKEND}/image/${id}`}
      alt=""
      className={style}
      {...rest}
    />
  );
}

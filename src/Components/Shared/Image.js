import React from 'react';
import { css, cx } from 'emotion';

const style = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default function Image({ id, className, ...rest }) {
  return (
    <img
      src={`${process.env.REACT_APP_BACKEND}/image/${id}`}
      alt=""
      className={cx(style, className)}
      {...rest}
    />
  );
}

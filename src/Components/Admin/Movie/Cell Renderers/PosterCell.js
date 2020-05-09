import React from 'react';
import { css } from 'emotion';

const container = css`
  width: 143px;
  height: 212px;
  background: #e3e3e3;
`;

const image = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default function PosterCell(props) {
  const { img } = props;

  return (
    <div className={container}>
      <img
        className={image}
        src={`${process.env.REACT_APP_BACKEND}/image/${img}`}
        alt=""
      />
    </div>
  );
}

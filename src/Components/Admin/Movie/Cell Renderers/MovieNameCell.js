import React from 'react';
import { css } from 'emotion';

export default function MovieNameCell(props) {
  const { nameEn, nameVn } = props;

  const container = css`
    display: flex;
    flex-direction: column;
    white-space: normal;
    line-height: 150%;
    margin: 10px 0;
  `;

  return (
    <div className={container}>
      <b>{nameEn}</b>
      <i>({nameVn})</i>
    </div>
  );
}

import React from 'react';

import { css } from 'emotion';

const style = css`
  font-size: 30px;
  text-align: center;
  margin: auto;
  color: black;
`;

export default function NoMatch() {
  return <div className={style}>Không tìm thấy trang</div>;
}

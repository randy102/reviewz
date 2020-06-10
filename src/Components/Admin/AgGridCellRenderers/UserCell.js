import React from 'react';

import { css } from 'emotion';

import Avatar from 'Components/Shared/Avatar';

import colors from 'Components/Shared/theme';

const styles = {
  container: css`
    display: flex;
    align-item: center;
    font-size: 14px;
    font-family: Roboto;
  `,
  img: css`
    width: 40px;
    height: 40px;
    border-radius: 999px;
    overflow: hidden;
    margin: 2px 10px 2px 0;
  `,
  span: css`
    display: flex;
    align-items: center;
    line-height: 150%;
    white-space: normal;
  `,
};

export default function UsernameCell(props) {
  const { username, img } = props;

  return (
    <div className={styles.container}>
      <div
        className={styles.img}
        style={{ background: img ? colors.imgPlaceholder : 'transparent' }}
      >
        <Avatar id={img} />
      </div>
      <span className={styles.span}>{username}</span>
    </div>
  );
}

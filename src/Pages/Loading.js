import React from 'react';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';
import { LoadingOutlined } from '@ant-design/icons';

const styles = {
  container: css`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: ${colors.primary};
  `,
  spinner: css`
    svg {
      font-size: 100px;
      color: ${colors.secondary};
    }
  `,
};

export default function Loading() {
  return (
    <div className={styles.container}>
      <LoadingOutlined className={styles.spinner} spin />
    </div>
  );
}

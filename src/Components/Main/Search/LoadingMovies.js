import React from 'react';
import colors from 'Components/Shared/theme';
import { css } from 'emotion';
import { LoadingOutlined } from '@ant-design/icons';

const styles = {
  container: css`
    display: flex;
    height: 510px;
  `,
  spinner: css`
    svg {
      font-size: 100px;
      color: ${colors.primary};
    }
  `,
};

export default function () {
  return (
    <div className={styles.container}>
      <LoadingOutlined className={styles.spinner} spin />
    </div>
  );
}

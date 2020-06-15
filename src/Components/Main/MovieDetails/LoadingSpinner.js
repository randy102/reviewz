import React from 'react';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';
import { LoadingOutlined } from '@ant-design/icons';

const styles = {
  spinner: css`
    svg {
      font-size: 100px;
      color: ${colors.primary};
    }
  `,
};

export default function () {
  return <LoadingOutlined className={styles.spinner} spin />;
}

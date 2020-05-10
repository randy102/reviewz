import React from 'react';
import { css } from 'emotion';
import Icon from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
import colors from 'Components/Shared/colors';

const styles = {
  container: css`
    display: flex;
    align-items: center;
  `,
  icon: css`
    color: ${colors.primary};
    font-size: 20px;
    line-height: 20px;
    margin-right: 5px;
  `,
  text: css`
    color: ${colors.primary};
    font-size: 20px;
    line-height: 20px;
  `,
};

export default function Stars({ starAvg }) {
  return (
    <div className={styles.container}>
      <Icon icon={starFilled} className={styles.icon} />
      <div className={styles.text}>{starAvg ? starAvg.toFixed(1) : '?'}</div>
    </div>
  );
}

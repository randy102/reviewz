import React from 'react';

import { Icon } from '@iconify/react';

import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';
import { cx, css } from 'emotion';
import colors from '../theme';

const styles = {
  container: css`
    color: ${colors.error};
    margin: 5px 0 0 0;
    padding-left: 40px;
    display: flex;
    align-items: center;
  `,
  icon: css`
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-right: 5px;
    align-self: flex-start;
  `,
  message: css`
    font-size: 16px;
    line-height: 19px;
  `,
};

export default function ErrorMessage(props) {
  const { message, style, className } = props;

  return (
    <div style={style} className={cx(styles.container, className)}>
      <Icon className={styles.icon} icon={alertCircleOutline} />
      <div className={styles.text}> {message}</div>
    </div>
  );
}

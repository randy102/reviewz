import React from 'react';

import { Icon } from '@iconify/react';

import styles from 'SCSS/Form.module.scss';

import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';

export default function ErrorMessage(props) {
  const { message, style } = props;

  return (
    <div style={style} className={styles.error_message}>
      <Icon className={styles.icon} icon={alertCircleOutline} />
      <div className={styles.text}> {message}</div>
    </div>
  );
}

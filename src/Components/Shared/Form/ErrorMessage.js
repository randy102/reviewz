import React from 'react';

import { Icon } from '@iconify/react';

import styles from 'SCSS/Form.module.scss';

export default function ErrorMessage(props) {
  const { icon, message, style } = props;

  return (
    <div style={style} className={styles.error_message}>
      <Icon className={styles.icon} icon={icon} />
      <div className={styles.text}> {message}</div>
    </div>
  );
}

import React from 'react';

import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';

import styles from 'SCSS/Image.module.scss';

export default function Image({id}) {
  return id ? (
    <img
      className={styles.default}
      src={`${process.env.REACT_APP_BACKEND}image/${id}`}
      alt=""
    />
  ) : (
    <Icon className={styles.default} icon={accountCircle} />
  );
}
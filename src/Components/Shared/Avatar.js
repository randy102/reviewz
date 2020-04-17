import React from 'react';

import styles from 'SCSS/Avatar.module.scss';

import { getCurrentUser } from 'Utils/auth';

import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';

export default function Avatar({ id }) {
  console.log(id);
  const imgId = id === undefined ? getCurrentUser().img : id;

  return (
    <>
      {imgId ? (
        <img
          className={styles.default}
          src={`${process.env.REACT_APP_BACKEND}image/${imgId}`}
          alt=""
        />
      ) : (
        <Icon className={styles.default} icon={accountCircle} />
      )}
    </>
  );
}

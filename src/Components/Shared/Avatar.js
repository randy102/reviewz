import React from 'react';

import { getCurrentUser } from 'Utils/auth';

import { css } from 'emotion';

import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';

import Image from 'Components/Shared/Image';

export default function Avatar({ id }) {
  const imgId = id === undefined ? getCurrentUser().img : id;

  const avatar = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `;

  return (
    <>
      {imgId !== '' ? (
        <Image id={imgId} className={avatar} />
      ) : (
        <Icon className={avatar} icon={accountCircle} />
      )}
    </>
  );
}

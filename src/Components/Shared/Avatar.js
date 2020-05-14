import React from 'react';

import { getCurrentUser } from 'Utils/auth';

import { css } from 'emotion';

import Image from 'Components/Shared/Image';

const styles = {
  whiteBackground: css`
    width: 100%;
    height: 100%;
    background: white;
  `,
  defaultAvatar: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    fill: none;

    path {
      fill: black;
    }
  `,
};

export default function Avatar(props) {
  const { id } = props;

  const imgId = id === undefined ? getCurrentUser().img : id;

  return (
    <>
      {imgId !== '' ? (
        <Image id={imgId} />
      ) : (
        <div className={styles.whiteBackground}>
          <svg
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.defaultAvatar}
          >
            <path d="M20 34.4C15 34.4 10.58 31.84 8 28C8.06 24 16 21.8 20 21.8C24 21.8 31.94 24 32 28C30.6778 29.9688 28.8917 31.5823 26.7991 32.6984C24.7065 33.8144 22.3716 34.3988 20 34.4V34.4ZM20 6C21.5913 6 23.1174 6.63214 24.2426 7.75736C25.3679 8.88258 26 10.4087 26 12C26 13.5913 25.3679 15.1174 24.2426 16.2426C23.1174 17.3679 21.5913 18 20 18C18.4087 18 16.8826 17.3679 15.7574 16.2426C14.6321 15.1174 14 13.5913 14 12C14 10.4087 14.6321 8.88258 15.7574 7.75736C16.8826 6.63214 18.4087 6 20 6V6ZM20 0C17.3736 0 14.7728 0.517315 12.3463 1.52241C9.91982 2.5275 7.71504 4.00069 5.85786 5.85786C2.10714 9.60859 0 14.6957 0 20C0 25.3043 2.10714 30.3914 5.85786 34.1421C7.71504 35.9993 9.91982 37.4725 12.3463 38.4776C14.7728 39.4827 17.3736 40 20 40C25.3043 40 30.3914 37.8929 34.1421 34.1421C37.8929 30.3914 40 25.3043 40 20C40 8.94 31 0 20 0Z" />
          </svg>
        </div>
      )}
    </>
  );
}

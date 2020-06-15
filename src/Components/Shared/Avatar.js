import React from 'react';

import { getCurrentUser } from 'Utils/auth';

import { css, cx } from 'emotion';

import Image from 'Components/Shared/Image';

const styles = {
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
  const { id, className } = props;

  const imgId = id === undefined ? getCurrentUser().img : id;

  return (
    <>
      {imgId !== '' ? (
        <Image id={imgId} className={className} />
      ) : (
        <svg
          className={cx(styles.defaultAvatar, className)}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="10" fill="white" />
          <path
            d="M10 17.2C7.5 17.2 5.29 15.92 4 14C4.03 12 8 10.9 10 10.9C12 10.9 15.97 12 16 14C15.3389 14.9844 14.4459 15.7912 13.3996 16.3492C12.3533 16.9072 11.1858 17.1994 10 17.2ZM10 3C10.7956 3 11.5587 3.31607 12.1213 3.87868C12.6839 4.44129 13 5.20435 13 6C13 6.79565 12.6839 7.55871 12.1213 8.12132C11.5587 8.68393 10.7956 9 10 9C9.20435 9 8.44129 8.68393 7.87868 8.12132C7.31607 7.55871 7 6.79565 7 6C7 5.20435 7.31607 4.44129 7.87868 3.87868C8.44129 3.31607 9.20435 3 10 3ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 4.47 15.5 0 10 0Z"
            fill="black"
          />
        </svg>
      )}
    </>
  );
}

import React from 'react';
import { loading_icon } from 'SCSS/Form.module.scss';

export default function Loading() {
  return (
    <svg viewBox="0 0 100 100" className={loading_icon}>
      <circle
        fill="none"
        cx="50"
        cy="50"
        r="40"
        strokeWidth="10px"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}

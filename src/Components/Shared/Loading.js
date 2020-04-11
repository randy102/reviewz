import React from 'react';

export default function Loading({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
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


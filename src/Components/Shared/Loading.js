import React from 'react';
import { css, cx } from 'emotion';
import colors from './colors';

const styles = css`
  width: 23px;
  height: 23px;

  circle {
    stroke: ${colors.secondary};
  }
`;

export default function Loading(props) {
  const { className } = props;

  return (
    <svg viewBox="0 0 100 100" className={cx(styles, className)}>
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

import React from 'react';

import { css, cx } from 'emotion';

import { Icon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';

import colors from 'Components/Shared/theme';

export default function Score(props) {
  const { score = '?' } = props;

  const container = css`
    display: flex;
    align-items: center;
  `;

  const star = css`
    font-size: 20px;
    color: ${colors.primary};
    margin-right: 5px;
  `;

  const text = css`
    display: flex;
    line-height: 150%;
    align-items: baseline;
  `;

  const scoreText = css`
    font-size: 20px;
  `;

  const scaleText = css`
    font-size: 12px;
  `;

  return (
    <div className={container}>
      <Icon style={{ stroke: 'black' }} className={star} icon={starFilled} />
      <div className={text}>
        <div className={scoreText}>{score}</div>
        <div className={scaleText}>/10</div>
      </div>
    </div>
  );
}

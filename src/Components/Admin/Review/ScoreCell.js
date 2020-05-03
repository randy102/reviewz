import React from 'react';

import { css } from 'emotion';

import { Icon } from '@iconify/react';

import starOutlined from '@iconify/icons-ant-design/star-outlined';

const styles = {
  container: css`
    display: flex;
    align-items: center;
  `,
  icon: css`
    font-size: 20px;
    margin-right: 5px;
  `,
  rating: css`
    display: flex;
    align-items: baseline;
  `,
  score: css`
    font-size: 20px;
    line-height: 150%;
  `,
  scale: css`
    font-size: 12px;
    line-height: 150%;
  `,
};

export default function ScoreCell(props) {
  const { score } = props;

  return (
    <div className={styles.container}>
      <Icon className={styles.icon} icon={starOutlined} />
      <div className={styles.rating}>
        <span className={styles.score}>{score}</span>
        <span className={styles.scale}>/10</span>
      </div>
    </div>
  );
}

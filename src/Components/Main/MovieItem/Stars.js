import React from 'react';
import { css } from 'emotion';
import Icon from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
import colors from 'Components/Shared/colors';

const styles = {
  container: css`
    display: flex;
    align-items: center;
  `,
  icon: css`
    color: ${colors.primary};
    font-size: 27px;
    margin-right: 5px;
  `,
  rating: css`
    display: flex;
    align-items: baseline;
  `,
  score: css`
    font-size: 30px;
    line-height: 30px;
    height: 30px;
  `,
  scale: css`
    font-size: 20px;
    line-height: 20px;
    height: 20px;
  `,
};

export default function Stars({ starAvg }) {
  return (
    <div className={styles.container}>
      <Icon icon={starFilled} className={styles.icon} />
      <div className={styles.rating}>
        <div className={styles.score}>{starAvg || '?'}</div>
        <div className={styles.scale}>/10</div>
      </div>
    </div>
  );
}

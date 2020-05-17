import React from 'react';
import { css } from 'emotion';

import { Icon } from '@iconify/react';
import starTwotone from '@iconify/icons-ant-design/star-twotone';

import colors from 'Components/Shared/theme';

const styles = {
  container: css`
    margin-top: 20px;
    display: flex;
    align-items: center;
  `,
  starIcon: css`
    font-size: 40px;
    margin-right: 5px;

    path:first-child {
      color: ${colors.secondary};
      fill-opacity: 1;
    }

    path:last-child {
      color: ${colors.primary};
    }
  `,
  text: css`
    display: flex;
    height: fit-content;
    align-items: baseline;
  `,
  score: css`
    color: ${colors.primary};
    font-size: 30px;
    line-height: 35px;
  `,
  scale: css`
    color: ${colors.primary};
    font-size: 20px;
    line-height: 23px;
  `,
  rated: css`
    color: ${colors.black};
    font-size: 20px;
    line-height: 23px;
    margin-left: 20px;
  `,
};

export default function AvgScore(props) {
  const { starAvg, rated } = props;

  return (
    <div className={styles.container}>
      <Icon className={styles.starIcon} icon={starTwotone} />
      <div className={styles.text}>
        <div className={styles.score}>{starAvg ? starAvg.toFixed(1) : '?'}</div>
        <div className={styles.scale}>/10</div>
        <div className={styles.rated}>({rated} lượt review)</div>
      </div>
    </div>
  );
}

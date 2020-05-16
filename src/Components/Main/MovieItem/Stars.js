import React from 'react';
import { css, cx } from 'emotion';
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
    font-size: 20px;
    line-height: 20px;
    margin-right: 5px;
  `,
  text: css`
    color: ${colors.primary};
    font-size: 20px;
    line-height: 20px;
  `,
};

export default function Stars(props) {
  const { starAvg, classNames = {} } = props;

  return (
    <div className={cx(styles.container, classNames.container)}>
      <Icon icon={starFilled} className={cx(styles.icon, classNames.icon)} />
      <div className={cx(styles.text, classNames.text)}>
        {starAvg ? starAvg.toFixed(1) : '?'}
      </div>
    </div>
  );
}

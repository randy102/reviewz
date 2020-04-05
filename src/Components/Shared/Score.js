import React from 'react';

import { Icon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';

import 'SCSS/Score.scss';

export default function Score(props) {
  const { prefix } = props;

  return (
    <div className={`rating ${prefix}-rating`}>
      <Icon className={`icon ${prefix}-icon`} icon={starFilled} />
      <div className={`score ${prefix}-score`}>
        <div className={`main ${prefix}-main`}>8</div>
        <div className={`scale ${prefix}-scale`}>/10</div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';

import { Icon } from '@iconify/react';
import starOutlined from '@iconify/icons-ant-design/star-outlined';
import starFilled from '@iconify/icons-ant-design/star-filled';
import { css, cx } from 'emotion';

const containerStyle = css`
  display: flex;
  justify-self: flex-start;
  width: 100%;
  padding-left: 40px;
`;

const starIcon = css`
  font-size: 40px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #6200ee;
  }
`;

const iconColored = css`
  color: #6200ee;
`;

const StarsInput = React.forwardRef((props, ref) => {
  // Props destructuring
  const { name, defaultValue = 0, errors, errorStyle } = props;

  // Stars input
  const [starsInput, setStarsInput] = useState(defaultValue);

  useEffect(() => {
    setStarsDisplay(starsInput);
  }, [starsInput]);

  // Stars for display
  const [starsDisplay, setStarsDisplay] = useState(defaultValue);

  return (
    <React.Fragment>
      <input
        style={{ display: 'none' }}
        type="number"
        value={starsInput}
        name={name}
        ref={ref}
        onChange={() => null}
      />
      <div className={containerStyle}>
        {[...Array(10)].map((_, index) => (
          <Icon
            onMouseEnter={() => setStarsDisplay(index + 1)}
            onMouseLeave={() => setStarsDisplay(starsInput)}
            onClick={() => setStarsInput(index + 1)}
            key={index}
            className={cx(starIcon, {
              [iconColored]: index + 1 <= starsDisplay,
            })}
            icon={index + 1 <= starsDisplay ? starFilled : starOutlined}
          />
        ))}
      </div>
      {errors[name] && (
        <ErrorMessage style={errorStyle} message={errors[name].message} />
      )}
    </React.Fragment>
  );
});

export default StarsInput;

import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import colors from 'Components/Shared/theme';
import Icon from '@iconify/react';
import starTwotone from '@iconify/icons-ant-design/star-twotone';

const styles = {
  container: css`
    display: flex;
  `,
  star: css`
    font-size: 30px;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:not(:last-child) {
      padding-right: 10px;
      box-sizing: content-box;
    }

    path:first-child {
      color: transparent;
    }

    path:last-child {
      color: ${colors.black};
    }
  `,
  active: css`
    path:first-child {
      color: ${colors.secondary};
      fill-opacity: 1;
    }
  `,
  disabled: css`
    pointer-events: none;
  `,
};

const StarRating = React.forwardRef((props, ref) => {
  const {
    clearError,
    defaultValue = 0,
    className,
    name,
    disabled = false,
    setValue,
    value,
  } = props;

  const [hover, setHover] = useState(defaultValue);

  useEffect(() => {
    setHover(value);
  }, [value]);

  return (
    <div
      className={cx(
        styles.container,
        {
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      <input
        style={{ display: 'none' }}
        ref={ref}
        type="number"
        name={name}
        defaultValue={defaultValue}
      />

      <div
        onMouseLeave={() => {
          setHover(value);
        }}
      >
        {[...Array(10)].map((_, index) => (
          <Icon
            onMouseEnter={() => {
              setHover(index + 1);
            }}
            onClick={() => {
              setValue(name, index + 1);
              clearError(name);
            }}
            key={index}
            className={cx(styles.star, {
              [styles.active]: index + 1 <= hover,
            })}
            icon={starTwotone}
          />
        ))}
      </div>
    </div>
  );
});

export default StarRating;

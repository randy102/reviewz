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

export default function Rate(props) {
  const { value, onChange, disabled = false } = props;

  // Update hover when value changes
  useEffect(() => {
    setHover(value);
  }, [value]);

  // Hover state
  const [hover, setHover] = useState(value);

  return (
    <div
      className={cx(styles.container, {
        [styles.disabled]: disabled,
      })}
    >
      <div
        style={{ display: 'flex' }}
        onMouseLeave={() => setHover(value)} // Set hover back to value when mouse leaves
      >
        {/* 10 stars */}
        {[...Array(10)].map((_, index) => (
          // Star Icon
          <Icon
            key={index}
            icon={starTwotone}
            onMouseEnter={() => setHover(index + 1)} // Set hover to this star
            onClick={() => onChange(index + 1)} // Update value on click
            className={cx(styles.star, {
              [styles.active]: index + 1 <= hover, // Light up if smaller than or equal to hover
            })}
          />
        ))}
      </div>
    </div>
  );
}

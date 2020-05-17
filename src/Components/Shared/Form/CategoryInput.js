import React, { useState, useEffect } from 'react';

import { css, cx } from 'emotion';

import { Icon } from '@iconify/react';
import ErrorMessage from './ErrorMessage';

import styles from 'SCSS/Form.module.scss';
import colors from '../theme';
import Color from 'color';

const CategoryInput = React.forwardRef((props, ref) => {
  // Props destructuring
  const {
    icon,
    name,
    clearError,
    errors,
    errorStyle,
    placeholder = '',
    defaultValue = '',
    categories = {},
  } = props;

  // Input value
  const [inputValue, setInputValue] = useState('');

  // Chosen categories
  const [chosen, setChosen] = useState(
    defaultValue ? defaultValue.split(' ') : []
  );

  // When chosen updates => Update input value
  useEffect(() => {
    setInputValue(chosen.join(' '));
  }, [chosen]);

  // When inputValue updates => clear error
  useEffect(() => {
    if (inputValue) {
      clearError(name);
    }
  }, [inputValue]);

  const classes = {
    inputContainer: css`
      border: 1px solid black;
      padding: 10px;
      flex-grow: 1;
    `,
    placeholder: css`
      color: #757575;
    `,
    icon: css`
      align-self: flex-start;
      margin-top: 8px;
      flex-shrink: 0;
    `,
    category: css`
      display: inline-block;
      padding: 5px 10px;
      cursor: pointer;
      border: 1px solid black;
      margin: 5px;
      transition: all 0.2s;
    `,
    normal: css`
      &:hover {
        background: ${Color(colors.primary).alpha(0.1).string()};
      }

      &:active {
        background: ${Color(colors.primary).alpha(0.2).string()};
      }
    `,
    chosen: css`
      background: ${colors.primary};
      color: ${colors.secondary};
      border-color: ${colors.primary};

      &:hover {
        opacity: 0.7;
      }
    `,
  };

  function Category(props) {
    const { id, name } = props;

    // Toggle on click
    function handleClick() {
      // Get index
      let index = chosen.indexOf(id);

      // If not inside => Push
      // If already inside => Remove
      if (index === -1) {
        setChosen([...chosen, id]);
      } else {
        setChosen(chosen.filter(item => item !== id));
      }
    }

    return (
      <div
        onClick={handleClick}
        className={cx(
          classes.category,
          chosen.includes(id) ? classes.chosen : classes.normal
        )}
      >
        {name}
      </div>
    );
  }

  return (
    <div className={styles.row}>
      <div className={styles.row_input}>
        {icon && <Icon className={cx(styles.icon, classes.icon)} icon={icon} />}
        <div className={classes.inputContainer}>
          <input
            style={{ display: 'none' }}
            name={name}
            ref={ref}
            type="text"
            value={inputValue}
            onChange={() => null}
          />
          <div className={classes.placeholder}>{placeholder}</div>
          {Object.keys(categories).map(id => (
            <Category key={id} id={id} name={categories[id]} />
          ))}
        </div>
      </div>
      {errors[name] && (
        <ErrorMessage style={errorStyle} message={errors[name].message} />
      )}
    </div>
  );
});

export default CategoryInput;

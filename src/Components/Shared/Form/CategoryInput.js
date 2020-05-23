import React, { useState, useEffect } from 'react';

import { css, cx } from 'emotion';

import { Icon } from '@iconify/react';
import ErrorMessage from './ErrorMessage';

import styles from 'SCSS/Form.module.scss';
import colors from '../theme';
import Color from 'color';

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
      background: ${colors.primary};
      opacity: 0.7;
    }
  `,
};

function Category(props) {
  const { id, name, setChosen } = props;

  // Toggle chosen style
  const [toggled, setToggled] = useState(false);

  // On click
  function handleClick() {
    // Update new set
    setChosen(chosen => {
      // Copy old set
      let newChosen = new Set(chosen);

      // If delete fails
      // => The set doesn't contain this id
      // => Add this id to the set
      if (!newChosen.delete(id)) {
        newChosen.add(id);
      }

      return newChosen;
    });

    // Toggle chosen button style
    setToggled(!toggled);
  }

  return (
    <div
      onClick={handleClick}
      className={cx(classes.category, { [classes.chosen]: toggled })}
    >
      {name}
    </div>
  );
}

const CategoryInput = React.forwardRef((props, ref) => {
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
  const [chosen, setChosen] = useState(new Set(defaultValue?.split(' ')));

  // When chosen updates => Update input value
  useEffect(() => {
    setInputValue([...chosen].join(' '));
  }, [chosen]);

  // When inputValue updates => clear error
  useEffect(() => {
    if (inputValue) {
      clearError(name);
    }
  }, [inputValue]);

  return (
    <div className={styles.row}>
      <div className={styles.row_input}>
        {icon && <Icon className={cx(styles.icon, classes.icon)} icon={icon} />}
        <div className={classes.inputContainer}>
          <input name={name} ref={ref} type="hidden" value={inputValue} />
          <div className={classes.placeholder}>{placeholder}</div>
          {Object.keys(categories).map(id => (
            <Category
              key={id}
              id={id}
              name={categories[id]}
              setChosen={setChosen}
            />
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

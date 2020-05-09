import React from 'react';

import { Icon } from '@iconify/react';
import ErrorMessage from './ErrorMessage';

import styles from 'SCSS/Form.module.scss';
import { cx, css } from 'emotion';

const style = css`
  border: 1px solid black;
  padding: 10px;
  resize: none;
`;

const TextAreaInput = React.forwardRef((props, ref) => {
  const {
    icon,
    name,
    placeholder,
    rows,
    errors,
    errorStyle,
    defaultValue,
    className,
    errorClassname,
  } = props;

  return (
    <div className={cx(styles.row, className)}>
      <div className={styles.row_input}>
        {icon && (
          <Icon
            style={{ alignSelf: 'flex-start', marginTop: '8px' }}
            className={styles.icon}
            icon={icon}
          />
        )}
        <textarea
          ref={ref}
          className={style}
          name={name}
          rows={rows}
          placeholder={placeholder}
          defaultValue={defaultValue}
        ></textarea>
      </div>

      {errors[name] && (
        <ErrorMessage
          className={errorClassname}
          style={errorStyle}
          message={errors[name].message}
        />
      )}
    </div>
  );
});

export default TextAreaInput;

import React from 'react';

import { Icon } from '@iconify/react';
import ErrorMessage from './ErrorMessage';

import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';

import styles from 'SCSS/Form.module.scss';

const TextAreaInput = React.forwardRef((props, ref) => {
  const {
    icon,
    name,
    placeholder,
    rows,
    style,
    errors,
    errorStyle,
    defaultValue,
  } = props;

  return (
    <div className={styles.row}>
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
          style={
            style || {
              border: '1px solid black',
              padding: '10px',
              resize: 'none',
            }
          }
          name={name}
          rows={rows}
          placeholder={placeholder}
          defaultValue={defaultValue}
        ></textarea>
      </div>

      {errors[name] && (
        <ErrorMessage
          style={errorStyle}
          icon={alertCircleOutline}
          message={errors[name].message}
        />
      )}
    </div>
  );
});

export default TextAreaInput;

import React from 'react';

import { Icon } from '@iconify/react';
import ErrorMessage from './ErrorMessage';

import styles from 'SCSS/Form.module.scss';

export const TextInput = React.forwardRef((props, ref) => {
  const {
    icon,
    name,
    placeholder,
    type,
    errors,
    errorStyle,
    defaultValue = '',
  } = props;

  return (
    <div className={styles.row}>
      <div className={styles.row_input}>
        {icon && <Icon className={styles.icon} icon={icon} />}

        <input
          ref={ref}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          type={type}
        />
      </div>

      {errors[name] && (
        <ErrorMessage style={errorStyle} message={errors[name].message} />
      )}
    </div>
  );
});

export default TextInput;

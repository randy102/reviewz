import React, { useState } from 'react';
import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';
import { Icon } from '@iconify/react';

import styles from 'SCSS/Form.module.scss';

export const ErrorMessage = props => {
  const { icon, message, style } = props;

  return (
    <div style={style} className={styles.error_message}>
      <Icon className={styles.icon} icon={icon} />
      <div className={styles.text}> {message}</div>
    </div>
  );
};

export const Row = React.forwardRef((props, ref) => {
  const { icon, name, placeholder, type, errors, errorStyle } = props;

  return (
    <div className={styles.row}>
      <div className={styles.row_input}>
        {icon && <Icon className={styles.icon} icon={icon} />}

        <input
          ref={ref}
          name={name}
          placeholder={placeholder}
          type={type}
        ></input>
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

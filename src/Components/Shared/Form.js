import React, { useState } from 'react';
import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';
import { Icon } from '@iconify/react';

import styles from 'SCSS/Form.module.scss';

export const ErrorMessage = props => {
  console.log(styles);

  const { icon, message } = props;

  return (
    <div className={styles.error_message}>
      <Icon className={styles.icon} icon={icon} />
      <div className={styles.text}> {message}</div>
    </div>
  );
};

export const Row = React.forwardRef((props, ref) => {
  const { icon, name, placeholder, type, errors } = props;

  return (
    <div className={styles.row}>
      <div className={styles.row_input}>
        <Icon className={styles.icon} icon={icon} />

        <input
          ref={ref}
          name={name}
          placeholder={placeholder}
          type={type}
        ></input>
      </div>

      {errors[name] && (
        <ErrorMessage
          icon={alertCircleOutline}
          message={errors[name].message}
        />
      )}
    </div>
  );
});

export const ToggleSwitch = React.forwardRef((props, ref) => {
  const { name, disabled = false, initialChecked = false } = props;

  const [checked, setChecked] = useState(initialChecked);

  return (
    <label className={styles.switch}>
      <input
        disabled={disabled}
        checked={checked}
        name={name}
        ref={ref}
        type="checkbox"
        onChange={() => setChecked(!checked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
});

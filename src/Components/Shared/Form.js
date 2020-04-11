import React, { useState } from 'react';
import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';
import { Icon } from '@iconify/react';

import 'SCSS/Form.scss';
import 'SCSS/ToggleSwitch.scss'

export const ErrorMessage = props => {

  const { icon, message } = props;

  return (
    <div className="error-message">
      <Icon className="icon" icon={icon} />
      <div className="text"> {message}</div>
    </div>
  );
};

export const Row = React.forwardRef((props, ref) => {
  const { icon, name, placeholder, type, errors } = props;

  return (
    <div className="row">
      <Icon className="icon" icon={icon} />

      <input
        ref={ref}
        name={name}
        placeholder={placeholder}
        type={type}
      ></input>

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
  const { name, checked = false, onChange, disabled = false } = props;

  return (
    <label className="switch">
      <input
        disabled={disabled}
        checked={checked}
        name={name}
        ref={ref}
        type="checkbox"
        onChange={onChange}
      />
      <span className="slider round"></span>
    </label>
  );
});

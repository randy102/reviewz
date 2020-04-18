import React from 'react';

import {
  button,
  button_filled,
  button_filled_2,
  button_outlined,
  button_outlined_2,
  button_text,
  submit_button,
  loading_icon,
} from 'SCSS/Buttons.module.scss';

import Loading from 'Components/Shared/Loading';

export function FilledButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_filled}`}
    >
      {text}
    </div>
  );
}

export function FilledButton2({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_filled_2}`}
    >
      {text}
    </div>
  );
}

export function OutlinedButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_outlined}`}
    >
      {text}
    </div>
  );
}

export function OutlinedButton2({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_outlined_2}`}
    >
      {text}
    </div>
  );
}

export function TextButton({ onClick, text, className = '' }) {
  return (
    <div onClick={onClick} className={`${className} ${button} ${button_text}`}>
      {text}
    </div>
  );
}

export function SubmitButton(props) {
  const { onClick = () => null, loading, text, style, className = '' } = props;

  return (
    <button
      style={style}
      className={`${submit_button} ${className}`}
      onClick={onClick}
    >
      {loading ? <Loading className={loading_icon} /> : text}
    </button>
  );
}

export function IconButton(props) {
  const { onClick = () => null, loading, text, style, className = '' } = props;

  return (
    <div onClick={onClick} className={styles.icon_container}>
      <Icon className={styles.icon} icon={icon} />
      {text && <span>{text}</span>}
    </div>
  );
}

import React from 'react';

import { Icon } from '@iconify/react';

import {
  button,
  button_filled,
  button_filled_2,
  button_outlined,
  button_outlined_2,
  button_text,
  submit_button,
  loading_icon,
  icon_button,
  icon_button__icon,
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
  const { onClick = () => null, text, style, className = '', icon } = props;

  return (
    <div
      style={style}
      onClick={onClick}
      className={`${icon_button} ${className}`}
    >
      <Icon className={icon_button__icon} icon={icon} />
      {text && <span>{text}</span>}
    </div>
  );
}

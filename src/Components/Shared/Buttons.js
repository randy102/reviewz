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
} from 'SCSS/Buttons.module.scss';

import Loading from 'Components/Shared/Loading';
import { cx, css } from 'emotion';
import colors from './theme';
import Color from 'color';

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

export function OutlinedButton({ onClick, text, className = '', icon }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_outlined}`}
    >
      {text}
      {icon && <Icon style={{ marginLeft: 5 }} icon={icon} />}
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
      {loading ? <Loading /> : text}
    </button>
  );
}

export function IconButton(props) {
  const { onClick = () => null, text, style, className, icon } = props;

  const styles = {
    container: css`
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      transition: all 0.15s;
      cursor: pointer;
      padding: 6px;
      height: fit-content;
      line-height: 16px;
      color: ${colors.primary};
      font-size: 16px;

      &:not(:last-of-type) {
        margin-right: 10px;
      }

      &:hover {
        background: ${Color(colors.primary).alpha(0.1).string()};
      }

      &:active {
        background: ${Color(colors.primary).alpha(0.2).string()};
      }
    `,
    icon: css`
      font-size: 24px;
    `,
    text: css`
      margin: 0 5px;
    `,
  };

  return (
    <div
      style={style}
      onClick={onClick}
      className={cx(styles.container, className)}
    >
      <Icon className={styles.icon} icon={icon} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

import React from 'react';

import { Icon } from '@iconify/react';

import Loading from 'Components/Shared/Loading';
import { cx, css } from 'emotion';
import colors from './theme';
import Color from 'color';

const styles = {
  button: css`
    position: relative;
    padding: 7px 10px;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    transition: all 0.2s;
    font-size: 16px;
    line-height: 20px;
    font-family: Roboto;

    &:hover {
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(0px);
    }

    &:not(:last-child) {
      margin-right: 1vw;
    }
  `,
  outlined: css`
    color: ${colors.secondary};
    box-shadow: 0px 0px 0px 1px ${colors.secondary} inset;
    border-radius: 0;
    z-index: 0;
    transition: all 0.2s ease-in;
    font-size: 16px;
    line-height: 1;

    &:hover {
      color: ${colors.primary};
      transform: translate(0);
    }

    &:before {
      content: '';
      position: absolute;
      background: ${colors.secondary};
      border-radius: inherit;
      bottom: 0;
      left: 0;
      right: 100%;
      top: 0;
      z-index: -1;
      transition: all 0.2s ease-in-out;
    }

    &:hover:before {
      right: 0;
    }
  `,
  text: css`
    color: ${colors.white};

    &:hover {
      color: ${colors.secondary};
    }
  `,
  submit: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    justify-self: center;
    padding: 10px 0;
    font-size: 20px;
    line-height: 23px;
    font-weight: 300;
    border-radius: 6px;
    background: ${colors.primary};
    color: ${colors.secondary};
    transition: all 0.2s;

    &:hover {
      background: ${colors.primaryHeavy};

      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus {
      outline: none;
    }
  `,
};

export function OutlinedButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={cx(styles.button, styles.outlined, className)}
    >
      {text}
    </div>
  );
}

export function TextButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={cx(styles.button, styles.text, className)}
    >
      {text}
    </div>
  );
}

export function SubmitButton(props) {
  const { onClick = () => null, loading, text, style, className = '' } = props;

  return (
    <button
      style={style}
      className={cx(styles.submit, className)}
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

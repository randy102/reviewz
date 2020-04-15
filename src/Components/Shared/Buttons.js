import React from 'react';

import {
  button,
  button_filled,
  button_filled_2,
  button_outlined,
  button_outlined_2,
  button_text,
} from 'SCSS/Buttons.module.scss';

function FilledButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_filled}`}
    >
      {text}
    </div>
  );
}

function FilledButton2({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_filled_2}`}
    >
      {text}
    </div>
  );
}

function OutlinedButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_outlined}`}
    >
      {text}
    </div>
  );
}

function OutlinedButton2({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_outlined_2}`}
    >
      {text}
    </div>
  );
}

function TextButton({ onClick, text, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${button} ${button_text}`}
    >
      {text}
    </div>
  );
}

export { FilledButton, OutlinedButton, FilledButton2, OutlinedButton2, TextButton };

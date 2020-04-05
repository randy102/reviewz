import React from 'react';

import 'SCSS/Buttons.scss';

function FilledButton({ onClick, text, className }) {
  return (
    <div onClick={onClick} className={`${className} button button-filled`}>
      {text}
    </div>
  );
}

function FilledButton2({ onClick, text, className }) {
  return (
    <div onClick={onClick} className={`${className} button button--filled-2`}>
      {text}
    </div>
  );
}

function OutlinedButton({ onClick, text, className }) {
  return (
    <div onClick={onClick} className={`${className} button button--outlined`}>
      {text}
    </div>
  );
}

function OutlinedButton2({ onClick, text, className }) {
  return (
    <div onClick={onClick} className={`${className} button button--outlined-2`}>
      {text}
    </div>
  );
}

export { FilledButton, OutlinedButton, FilledButton2, OutlinedButton2};

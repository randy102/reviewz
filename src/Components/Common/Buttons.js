import React from 'react';

import 'CSS/Buttons.css';

function FilledButton({ onClick, text, style }) {
  return (
    <div style={style} onClick={onClick} className="btn btn-filled">
      {text}
    </div>
  );
}

function FilledButton2nd({ onClick, text, style }) {
  return (
    <div style={style} onClick={onClick} className="btn btn-filled-2nd">
      {text}
    </div>
  );
}

function OutlinedButton({ onClick, text, style }) {
  return (
    <div style={style} onClick={onClick} className="btn btn-outlined">
      {text}
    </div>
  );
}

function OutlinedButton2nd({ onClick, text, style }) {
  return (
    <div style={style} onClick={onClick} className="btn btn-outlined-2nd">
      {text}
    </div>
  );
}

export { FilledButton, OutlinedButton, FilledButton2nd, OutlinedButton2nd };

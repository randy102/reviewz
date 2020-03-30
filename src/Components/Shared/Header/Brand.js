import React from 'react';
import Logo from './Logo';

import history from '../../../history';

export default function Brand() {

  function backToHome() {
    if (history.location.pathname !== '/') {
      history.push('/');
    }
  }

  return (
    <div onClick={backToHome} className="brand">
      <Logo />
      <div className="brand__name">Reviewz</div>
    </div>
  );
}

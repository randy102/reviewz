import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from './Logo';

export default function Brand() {
  const history = useHistory();

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

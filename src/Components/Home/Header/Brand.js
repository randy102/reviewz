import React from 'react';
import Logo from './Logo';

export default function Brand() {
  return (
    <div className="brand">
      <Logo size={50} />
      <div className="brand__name">Reviewz</div>
    </div>
  );
}

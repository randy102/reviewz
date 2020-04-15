import React from 'react';

import { Helmet } from 'react-helmet';

import Header from 'Components/Shared/Header';

export default function Profile() {
  return (
    <div className="home-page">
      <Helmet>
        <title>Reviewz | Trang chủ</title>
      </Helmet>
      <Header />
    </div>
  );
}

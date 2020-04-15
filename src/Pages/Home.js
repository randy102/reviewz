import React from 'react';

import { Helmet } from 'react-helmet';

import Header from 'Components/Shared/Header';
import HomeCarousel from 'Components/Home/HomeCarousel';
import Gallery from 'Components/Home/Gallery';

import 'SCSS/Reset.scss';

export default function Home() {
  return (
    <div className="home-page">
      <Helmet>
        <title>Reviewz | Trang chủ</title>
      </Helmet>
      <Header />
      <HomeCarousel />
      <Gallery label="ĐANG CHIẾU RẠP" more="/" />
    </div>
  );
}

import React from 'react';

import { Helmet } from 'react-helmet';

import HomeCarousel from 'Components/Main/Welcome/HomeCarousel';
import Gallery from 'Components/Main/Welcome/Gallery';

export default function Welcome() {
  return (
    <>
      <Helmet>
        <title>Reviewz | Trang chủ</title>
      </Helmet>
      <HomeCarousel />
      <Gallery label="ĐANG CHIẾU RẠP" more="/" />
    </>
  );
}

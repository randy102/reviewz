import React from 'react';

import { Helmet } from 'react-helmet';

import HomeCarousel from 'Components/Welcome/HomeCarousel';
import Gallery from 'Components/Welcome/Gallery';

export default function Home() {
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

import React from 'react';

import { Helmet } from 'react-helmet';

import HomeCarousel from 'Components/Main/Welcome/HomeCarousel';
import { css } from 'emotion';

const styles = {
  grid: css`
    display: grid;
    grid-template: auto / 1fr;
    row-gap: 50px;
  `,
};

export default function Welcome() {
  return (
    <div>
      <Helmet>
        <title>Reviewz | Trang chủ</title>
      </Helmet>

      <div className={styles.grid}>
        <HomeCarousel
          label="MỚI NHẤT"
          more={{
            pathname: '/search',
            lastRelease: true,
          }}
          params="?limit=12&lastRelease=true"
          autoplay
        />
        <HomeCarousel
          label="ĐIỂM CAO"
          more={{
            pathname: '/search',
            highestStar: true,
          }}
          params="?limit=12&highestStar=true"
        />
        <HomeCarousel
          label="HÀNH ĐỘNG"
          more={{
            pathname: '/search',
            category: '5e9e725d18cd1f0520cd9d56',
            lastRelease: true,
          }}
          params="?limit=12&category=5e9e725d18cd1f0520cd9d56&lastRelease=true"
        />
      </div>
    </div>
  );
}

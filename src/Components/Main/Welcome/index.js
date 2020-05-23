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
          more="/search/"
          params="?limit=12"
          autoplay
        />
        <HomeCarousel
          label="ĐIỂM CAO"
          more="/search/?highestStar=true"
          params="?limit=12&highestStar=true"
        />
        <HomeCarousel
          label="NHIỀU ĐÁNH GIÁ"
          more="/search/?mostRated=true"
          params="?limit=12&mostRated=true"
        />
      </div>
    </div>
  );
}

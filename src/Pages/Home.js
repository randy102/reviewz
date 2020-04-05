import React from 'react';
import Header from 'Components/Shared/Header/Header';
import HomeCarousel from 'Components/Home/HomeCarousel';

import 'SCSS/Reset.scss';
import Gallery from 'Components/Home/Gallery';

export default function Home() {
  const movies = [
    {
      name: 'Bloodshot',
      poster:
        'https://galaxycine.vn/media/2020/2/3/mv5bogfjztexzjitnwy2ns00y2iyltgwzgqtmta1y2uxmdfhmmrixkeyxkfqcgdeqxvyodk4otc3mty--v1-_1580704290444.jpg',
      path: '/'
    },
    {
      name: 'Nắng 3: Lời hứa của cha',
      poster:
        'https://galaxycine.vn/media/2020/2/25/450x300_1582597508575.jpg',
      path: '/'
    },
    {
      name: 'Onward',
      poster:
        'https://galaxycine.vn/media/2020/2/24/450x300_1582529315801.jpg',
      path: '/'
    },
    {
      name: 'Coma',
      poster:
        'https://galaxycine.vn/media/2020/3/10/450x300-coma_1583828922230.jpg',
      path: '/'
    },
    {
      name: 'Honest Candidate',
      poster:
        'https://galaxycine.vn/media/2020/3/13/450x300-can-di_1584071341328.JPG',
      path: '/'
    },
    {
      name: 'The Dustwalker',
      poster:
        'https://galaxycine.vn/media/2020/3/12/450x300_1583985455287.jpg',
      path: '/'
    },
  ];

  return (
    <div className="home-page">
      <Header />
      <HomeCarousel />
      <Gallery label="ĐANG CHIẾU RẠP" movies={movies} more="/" />
    </div>
  );
}

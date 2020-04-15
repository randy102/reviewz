import React from 'react';

import styles from 'SCSS/Home/Gallery.module.scss';

import { OutlinedButton } from 'Components/Shared/Buttons';

import { useHistory } from 'react-router-dom';

export default function Gallery(props) {
  const movies = [
    {
      name: 'Bloodshot',
      poster:
        'https://galaxycine.vn/media/2020/2/3/mv5bogfjztexzjitnwy2ns00y2iyltgwzgqtmta1y2uxmdfhmmrixkeyxkfqcgdeqxvyodk4otc3mty--v1-_1580704290444.jpg',
      path: '/',
    },
    {
      name: 'Nắng 3: Lời hứa của cha',
      poster: 'https://galaxycine.vn/media/2020/2/25/450x300_1582597508575.jpg',
      path: '/',
    },
    {
      name: 'Onward',
      poster: 'https://galaxycine.vn/media/2020/2/24/450x300_1582529315801.jpg',
      path: '/',
    },
    {
      name: 'Coma',
      poster:
        'https://galaxycine.vn/media/2020/3/10/450x300-coma_1583828922230.jpg',
      path: '/',
    },
    {
      name: 'Honest Candidate',
      poster:
        'https://galaxycine.vn/media/2020/3/13/450x300-can-di_1584071341328.JPG',
      path: '/',
    },
    {
      name: 'The Dustwalker',
      poster: 'https://galaxycine.vn/media/2020/3/12/450x300_1583985455287.jpg',
      path: '/',
    },
  ];

  /* Gallery properties:
    label: Tên gallery
    movies: [
      { name: Tên phim, poster: Link ảnh, path: Đường dẫn tới page phim},
      { name: Tên phim, poster: Link ảnh, path: Đường dẫn tới page phim},
      { name: Tên phim, poster: Link ảnh, path: Đường dẫn tới page phim},
      ...
    ]
    more: Đường dẫn tới page xem thêm
  */

  const { label, more } = props;

  const history = useHistory();

  return (
    <div className={styles.gallery}>
      <div className={styles.label}>{label}</div>
      <div className={styles.grid}>
        {movies.map(({ name, poster, path }, index) => (
          <div key={index} className={styles.movie}>
            <div className={styles.content}>
              <img className={styles.poster} src={poster} alt="" />

              <a href={path}>
                <div className={styles.overlay}>
                  <div className=""></div>
                </div>
              </a>
            </div>

            <a className={styles.name} href={path}>
              {name}
            </a>
          </div>
        ))}
        <OutlinedButton
          onClick={() => history.push(more)}
          className={styles.more}
          text="XEM THÊM"
        />
      </div>
    </div>
  );
}

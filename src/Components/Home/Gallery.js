import React from 'react';

import 'SCSS/Home/Gallery.scss';

import { OutlinedButton } from 'Components/Shared/Buttons';

import { useHistory } from 'react-router-dom';

export default function Gallery(props) {
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

  const { label, movies, more } = props;

  const history = useHistory();

  return (
    <div className="gallery">
      <div className="label">{label}</div>
      <div className="grid">
        {movies.map(({ name, poster, path }, index) => (
          <div key={index} className="movie">
            <div className="content">
              <img className="poster" src={poster} alt="" />

              <a href={path}>
                <div className="overlay">
                  <div className=""></div>
                </div>
              </a>
            </div>

            <a className="name" href={path}>
              {name}
            </a>
          </div>
        ))}
        <OutlinedButton
          onClick={() => history.push(more)}
          className="more"
          text="XEM THÊM"
        />
      </div>
    </div>
  );
}

import React from 'react';

export default function Genres() {

  function GenreItem(genre) {
    return (
      <div className="genre-irem">
        {genre}
      </div>
    )
  }

  const genres = ["HÀNH ĐỘNG", "PHIÊU LƯU", "KINH DỊ", "DRAMA", "HÀI HƯỚC"];

  return (
    <div className="genres-container">
      <div className="genres">
        {
          genres.map(genre => GenreItem(genre))
        }
      </div>
    </div>
  );
}

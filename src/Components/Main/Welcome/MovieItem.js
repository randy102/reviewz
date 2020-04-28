import React from 'react';

import Score from 'Components/Shared/Score.js';

export default function MovieItem(props) {

  const { imagePath, name } = props;

  return (
    <div className="movie-item">
      <Score prefix="movie-item"/>
      <img className="" src={imagePath} alt="" />
    </div>
  )
}
import React from 'react';

// Canvas to measure string length in pixels
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '16px Roboto';

export default function CategoriesCell(props) {
  const { value } = props;

  return (
    <div>
      {value
        .sort((a, b) => {
          // Calculate string length in pixels using the canvas above
          let aWidth = ctx.measureText(a).width;
          let bWidth = ctx.measureText(b).width;

          // Sort strings based on pixels length (ascending)
          return bWidth - aWidth;
        })
        .map((genre, index, array) => (
          <React.Fragment key={genre}>
            {genre}
            {index !== array.length - 1 && <br />}
          </React.Fragment>
        ))}
    </div>
  );
}

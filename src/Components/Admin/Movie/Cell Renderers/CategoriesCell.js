import React, { useEffect } from 'react';
import { css } from 'emotion';

// Canvas to measure string length in pixels
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '16px Roboto';

const styles = {
  container: css`
    font-size: 16px;
    font-family: Roboto;
  `,
};

export default function ({ value }) {
  return (
    <div className={styles.container}>
      {value &&
        value
          .sort((a, b) => {
            // Calculate string length in pixels using the canvas above
            let aWidth = ctx.measureText(a.name).width;
            let bWidth = ctx.measureText(b.name).width;

            // Sort strings based on pixels length (ascending)
            return bWidth - aWidth;
          })
          .map((genre, index) => (
            <div key={genre.id}>
              {genre.name}
              {index !== value.length - 1 && <br />}
            </div>
          ))}
    </div>
  );
}

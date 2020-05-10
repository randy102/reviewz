import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GenresContext } from 'Components/Shared/GenresContext';

import { Icon } from '@iconify/react';
import { TextButton } from 'Components/Shared/Buttons';
import chevronLeft from '@iconify/icons-entypo/chevron-left';
import chevronRight from '@iconify/icons-entypo/chevron-right';
import { css, cx } from 'emotion';

import styles from 'SCSS/Header.module.scss';

const genreItem = css`
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

export default function Genres() {
  // Genres from context
  const genres = useContext(GenresContext);

  const contentRef = useRef(null);

  const [rightDisabled, disableRight] = useState(false);
  const [leftDisabled, disableLeft] = useState(true);

  const scrollAmount = 300;

  function scrollLeft() {
    const { scrollLeft } = contentRef.current;

    const newScroll = scrollLeft - scrollAmount;

    contentRef.current.scrollLeft = newScroll;

    if (rightDisabled) {
      disableRight(false);
    }

    if (newScroll <= 0) {
      disableLeft(true);
    }
  }

  function scrollRight() {
    const { scrollWidth, clientWidth, scrollLeft } = contentRef.current;

    const newScroll = scrollLeft + scrollAmount;

    contentRef.current.scrollLeft = newScroll;

    if (leftDisabled) {
      disableLeft(false);
    }

    if (newScroll >= scrollWidth - clientWidth) {
      disableRight(true);
    }
  }

  return (
    <div className={styles.genres_container}>
      <div className={styles.genres}>
        <button
          className={styles.left}
          disabled={leftDisabled || !genres}
          onClick={scrollLeft}
        >
          <Icon className={styles.chevron} icon={chevronLeft} />
        </button>

        <div ref={contentRef} className={styles.content}>
          {genres ? (
            Object.keys(genres).map(genreId => (
              <Link
                className={cx(styles.item, genreItem)}
                key={genreId}
                to={`/search/?category=${genreId}`}
              >
                {genres[genreId]}
              </Link>
            ))
          ) : (
            <div className={styles.item}>Đang tải...</div>
          )}
        </div>

        <button
          className={styles.right}
          disabled={rightDisabled || !genres}
          onClick={scrollRight}
        >
          <Icon className={styles.chevron} icon={chevronRight} />
        </button>
      </div>
    </div>
  );
}

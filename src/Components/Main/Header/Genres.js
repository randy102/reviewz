import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GenresContext } from 'Components/Shared/GenresContext';

import { Icon } from '@iconify/react';
import { TextButton } from 'Components/Shared/Buttons';
import chevronLeft from '@iconify/icons-entypo/chevron-left';
import chevronRight from '@iconify/icons-entypo/chevron-right';

import styles from 'SCSS/Header.module.scss';

export default function Genres() {
  // Genres from context
  const genres = useContext(GenresContext);

  const history = useHistory();

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
              <TextButton
                key={genreId}
                className={styles.item}
                onClick={() =>
                  history.push({
                    pathname: '/search',
                    category: genreId,
                  })
                }
                text={genres[genreId]}
              />
            ))
          ) : (
            <TextButton className={styles.item} text="Đang tải..." />
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

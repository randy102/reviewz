import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GenresContext } from 'Components/Shared/GenresContext';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-entypo/chevron-left';
import chevronRight from '@iconify/icons-entypo/chevron-right';
import { css, cx } from 'emotion';

import colors from 'Components/Shared/theme';
import Color from 'color';
import { useEffect } from 'react';

const genreItem = css`
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const styles = {
  container: css`
    background: ${colors.primaryHeavy};
    display: flex;
    justify-content: center;
  `,
  inner: css`
    display: flex;
    align-items: center;
    max-width: 1174px;
    width: 100%;
  `,
  content: css`
    display: flex;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scroll-snap-align: end;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    align-items: center;
  `,
  item: css`
    white-space: nowrap;
    color: ${colors.white};
    padding: 10px 0;
    scroll-snap-stop: always;
    scroll-snap-align: inherit;

    &:hover {
      color: ${colors.secondary};
    }

    &:not(:last-child) {
      margin-right: 30px;
    }
  `,
  navButton: css`
    background: transparent;
    color: ${colors.white};
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    padding: 0;

    &:hover:enabled {
      color: ${colors.secondary};
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: default;
      color: ${Color(colors.white).alpha(0.3).string()};
    }
  `,
  left: css`
    padding-right: 10px;

    &:hover:enabled {
      transform: translateX(-3px);
    }
  `,
  right: css`
    padding-left: 10px;

    &:hover:enabled {
      transform: translateX(3px);
    }
  `,
  chevron: css`
    display: block;
    height: 24px;
    width: 24px;
  `,
};

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
    <div className={styles.container}>
      <div className={styles.inner}>
        <button
          className={cx(styles.navButton, styles.left)}
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
          className={cx(styles.navButton, styles.right)}
          disabled={rightDisabled || !genres}
          onClick={scrollRight}
        >
          <Icon className={styles.chevron} icon={chevronRight} />
        </button>
      </div>
    </div>
  );
}

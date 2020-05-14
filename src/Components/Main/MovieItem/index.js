import React, { useEffect } from 'react';
import { css, cx } from 'emotion';
import Image from 'Components/Shared/Image';
import colors from 'Components/Shared/colors';
import Color from 'color';
import Stars from './Stars';
import { Link } from 'react-router-dom';
import unixToDate from 'Utils/unixToDate';

const styles = {
  container: css`
    width: 279px;
    height: 513px;
  `,
  icon: css`
    color: ${colors.primary};
    font-size: 27px;
    margin-right: 5px;
  `,
  rating: css`
    display: flex;
    align-items: flex-end;
  `,
  poster: css`
    width: 279px;
    height: 412px;
    background: ${colors.imgPlaceholder};
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  `,
  labelContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 10px;
    color: ${colors.black};
  `,
  movieName: css`
    font-size: 20px;
    line-height: 23px;
    font-weight: bold;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
    transition: all 0.2s;

    &:hover,
    &:focus {
      color: ${colors.primary};
    }

    &:active {
      color: ${colors.primaryHeavy};
    }
  `,
  scoreAndDate: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 5px;
  `,
  releaseDate: css`
    font-size: 16px;
    line-height: 16px;
    font-weight: normal;
    color: inherit;
    justify-self: right;
  `,
  hoverOverlay: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    transition: all 0.2s;

    &:hover,
    &:focus {
      background: ${Color(colors.black).alpha(0.1).string()};
    }

    &:active {
      background: ${Color(colors.black).alpha(0.2).string()};
    }
  `,
  disabled: css`
    &:active {
      pointer-events: none;
    }
  `,
};

export default function MovieItem(props) {
  const {
    disabled = false,
    movie: { starAvg, img, nameEn, id, releaseDate },
  } = props;

  useEffect(() => {
    console.log('movie item disabled:', disabled);
  }, [disabled]);

  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <Link
          draggable={false}
          to={`/movie/${id}`}
          className={cx(styles.hoverOverlay, {
            [styles.disabled]: disabled,
          })}
        />
        <Image draggable={false} id={img} />
      </div>

      <div className={styles.labelContainer}>
        <div className={styles.scoreAndDate}>
          <Stars starAvg={starAvg} />
          <i className={styles.releaseDate}>{unixToDate(releaseDate)}</i>
        </div>

        <Link
          draggable={false}
          to={`/movie/${id}`}
          className={cx(styles.movieName, {
            [styles.disabled]: disabled,
          })}
        >
          {nameEn}
        </Link>
      </div>
    </div>
  );
}

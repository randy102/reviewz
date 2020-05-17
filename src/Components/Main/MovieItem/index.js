import React, { useEffect } from 'react';
import { css, cx } from 'emotion';
import Image from 'Components/Shared/Image';
import colors from 'Components/Shared/theme';
import Color from 'color';
import Stars from './Stars';
import { Link } from 'react-router-dom';
import unixToDate from 'Utils/helpers/unixToDate';

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
    width: 100%;
    padding-bottom: 147.530726257%;
    background: ${colors.imgPlaceholder};
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  `,
  posterImage: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
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
    align-items: center;
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
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    transition: all 0.2s;
    z-index: 1;

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
    classNames = {},
  } = props;

  return (
    <div className={cx(styles.container, classNames.container)}>
      <div className={styles.poster}>
        <Link
          draggable={false}
          to={`/movie/${id}`}
          className={cx(styles.hoverOverlay, {
            [styles.disabled]: disabled,
          })}
        />
        <Image className={styles.posterImage} draggable={false} id={img} />
      </div>

      <div className={styles.labelContainer}>
        <div className={styles.scoreAndDate}>
          <Stars
            classNames={{
              container: classNames.starContainer,
              icon: classNames.starIcon,
              text: classNames.starText,
            }}
            starAvg={starAvg}
          />
          <i className={cx(styles.releaseDate, classNames.releaseDate)}>
            {unixToDate(releaseDate)}
          </i>
        </div>

        <Link
          draggable={false}
          to={`/movie/${id}`}
          className={cx(styles.movieName, classNames.movieName, {
            [styles.disabled]: disabled,
          })}
        >
          {nameEn}
        </Link>
      </div>
    </div>
  );
}

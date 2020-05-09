import React from 'react';
import Icon from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
import { css } from 'emotion';
import Image from 'Components/Shared/Image';
import colors from 'Components/Shared/colors';
import Stars from './Stars';
import { useHistory } from 'react-router-dom';
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
  scoreContainer: css`
    display: flex;
    align-items: baseline;
    flex: 1 1 auto;
    color: ${colors.primary};
  `,
  rated: css`
    font-size: 16px;
    margin-left: auto;
    color: ${colors.black};
  `,
  poster: css`
    width: 279px;
    height: 412px;
    background: ${colors.imgPlaceholder};
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
  `,
  labelContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 10px;
    color: ${colors.black};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: ${colors.primary};
    }
  `,
  movieName: css`
    font-size: 20px;
    font-weight: bold;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  releaseDate: css`
    font-size: 16px;
    font-weight: normal;
    color: inherit;
  `,
};

export default function MovieItem({ movie }) {
  const { starAvg, rated, img, nameEn, id, releaseDate } = movie;

  const history = useHistory();

  function goToMovieDetails() {
    history.push(`/movie/${id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <div className={styles.scoreContainer}>
          <Stars starAvg={starAvg} />
          <div className={styles.rated}>{rated} lượt review</div>
        </div>
      </div>
      <div onClick={goToMovieDetails} className={styles.poster}>
        <Image id={img} />
      </div>
      <div onClick={goToMovieDetails} className={styles.labelContainer}>
        <div className={styles.movieName}>{nameEn}</div>
        <i className={styles.releaseDate}>{unixToDate(releaseDate)}</i>
      </div>
    </div>
  );
}

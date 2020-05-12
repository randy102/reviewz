import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRequest } from 'Utils/request';

import { GenresContext } from 'Components/Shared/GenresContext';
import Image from 'Components/Shared/Image';
import unixToDate from 'Utils/unixToDate';
import { css } from 'emotion';

import colors from 'Components/Shared/colors';
import GenreItem from './GenreItem';
import AvgScore from './AvgScore';
import YourReview from './YourReview';
import { getCurrentUser, loggedIn } from 'Utils/auth';
import NotLoggedIn from './NotLoggedIn';

const styles = {
  container: css`
    max-width: 1174px;
    margin: 0 auto;
    color: ${colors.black};
  `,
  poster: css`
    flex-shrink: 0;
    width: 378px;
    height: 567px;
    margin-right: 20px;
    background: ${colors.imgPlaceholder};
  `,
  detailsContainer: css`
    display: flex;
  `,
  details: css`
    display: flex;
    flex-direction: column;
  `,
  movieName: css`
    font-size: 30px;
    line-height: 35px;
  `,
  releaseDate: css`
    font-size: 16px;
    font-style: italic;
    margin-top: 10px;
  `,
  genresContainer: css`
    margin-top: 15px;
    display: flex;
  `,
  summary: css`
    margin-top: 15px;
    font-size: 16px;
    line-height: 150%;
  `,
};

export default function MovieDetails() {
  let { id } = useParams();

  const history = useHistory();

  const genres = useContext(GenresContext);

  const [details, setDetails] = useState();

  const [requestDetails] = useRequest({
    onError: error => {
      console.log('Get details error:', error);
      history.push('/');
    },
    onResponse: response => {
      setDetails(response.data);
    },
  });

  const [reviews, setReviews] = useState();

  const [requestReviews, { refetch: refetchReviews }] = useRequest({
    onError: error => {
      console.log('Get reviews error:', error);
    },
    onResponse: response => {
      setReviews(response.data);
    },
  });

  // Request movie details on mount
  useEffect(() => {
    requestDetails({
      api: `movie/detail/${id}`,
      method: 'GET',
    });
    requestReviews({
      api: `review/movie/${id}`,
      method: 'GET',
    });
  }, []);

  console.log('details:', details);
  console.log('reviews:', reviews);

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.poster}>
          <Image id={details?.img} />
        </div>

        {details ? (
          <div className={styles.details}>
            <div className={styles.movieName}>{details.nameEn}</div>

            <div className={styles.movieName}>({details.nameVn})</div>

            <div className={styles.releaseDate}>
              {unixToDate(details.releaseDate)}
            </div>

            <div className={styles.genresContainer}>
              {details.categories.map(genreId => (
                <GenreItem key={genreId} genres={genres} genreId={genreId} />
              ))}
            </div>

            <div className={styles.summary}>{details.summary}</div>

            <AvgScore starAvg={details.starAvg} rated={details.rated} />

            {loggedIn() ? (
              <YourReview
                idMovie={id}
                yourReview={reviews?.find(
                  review => review.idUser === getCurrentUser().id
                )}
                refetchReviews={refetchReviews}
              />
            ) : (
              <NotLoggedIn />
            )}
          </div>
        ) : (
          <div className={styles.movieName}>Đang tải...</div>
        )}
      </div>
    </div>
  );
}

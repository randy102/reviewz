import React, { useEffect, useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { useRequest } from 'Utils/request';
import queryString from 'query-string';
import MovieItem from '../MovieItem';
import { css } from 'emotion';
import { Pagination } from 'antd';
import colors from 'Components/Shared/theme';
import Filter from './Filter';

import './Pagination.scss';
import Request from './Request';
import LoadingMovies from './LoadingMovies';

const styles = {
  loading: css`
    font-size: 30px;
    text-align: center;
    color: ${colors.black};
  `,
  container: css`
    max-width: 1174px;
    margin: 0 auto;
    color: ${colors.black};
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 10px;
  `,
  title: css`
    font-size: 40px;
    line-height: 40px;
    &:first-letter {
      text-transform: uppercase;
    }
  `,
  moviesContainer: css`
    display: grid;
    grid-template: auto / repeat(6, 1fr);
    row-gap: 30px;
    column-gap: 20px;
    margin: 30px 0;

    @media (max-width: 800px) {
      grid-template: auto / repeat(4, 1fr);
    }

    @media (max-width: 528px) {
      grid-template: auto / repeat(3, 1fr);
    }
  `,
  movieItemContainer: css`
    width: 100%;
    height: fit-content;
  `,
  movieName: css`
    font-size: 16px;
    line-height: 19px;
  `,
  releaseDate: css`
    font-size: 13px;
    line-height: 13px;
  `,
  starContainer: css``,
  starIcon: css`
    font-size: 16px;
    line-height: 16px;
  `,
  starText: css`
    font-size: 16px;
    line-height: 16px;
  `,
};

export default function Movies(props) {
  // History
  const history = useHistory();

  // Movies
  const [movies, setMovies] = useState([]);

  // Get movies
  const [filterMovies, { loading }] = useRequest({
    onError: error => console.log('Filter movies error:', error),
    onResponse: response => setMovies(response.data),
  });

  // Send query request
  function fetchWithQuery(query) {
    filterMovies({
      api: `movie/filter${query}`,
      method: 'GET',
    });
  }

  // Get movies on mount
  useEffect(() => {
    fetchWithQuery(history.location.search);
  }, [history.location.search]);

  // Number of movies each page
  const [pageSize] = useState(18);

  // Movies offset
  const [offset, setOffset] = useState(0);

  // Handle page change
  function handlePagination(page, pageSize) {
    setOffset((page - 1) * pageSize);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Danh sách phim</div>

        {/* Filter button */}
        <Filter />
      </div>

      {loading ? (
        <LoadingMovies />
      ) : (
        <React.Fragment>
          {/* Pagination */}
          <Pagination
            current={offset / pageSize + 1}
            onChange={handlePagination}
            pageSize={pageSize}
            total={movies.length}
          />

          {/* Movies */}
          <div className={styles.moviesContainer}>
            {movies.slice(offset, offset + pageSize).map(movie => (
              <MovieItem
                key={movie.id}
                movie={movie}
                classNames={{
                  container: styles.movieItemContainer,
                  movieName: styles.movieName,
                  releaseDate: styles.releaseDate,
                  starContainer: styles.starContainer,
                  starIcon: styles.starIcon,
                  starText: styles.starText,
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            current={offset / pageSize + 1}
            onChange={handlePagination}
            pageSize={pageSize}
            total={movies.length}
          />
          <Request />
        </React.Fragment>
      )}
    </div>
  );
}

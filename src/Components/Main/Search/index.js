import React, { useEffect, useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { useRequest } from 'Utils/request';
import queryString from 'query-string';
import MovieItem from '../MovieItem';
import { css } from 'emotion';
import { GenresContext } from 'Components/Shared/GenresContext';

import filterIcon from '@iconify/icons-mdi/filter';

import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import colors from 'Components/Shared/colors';
import Filter from './Filter';
import Icon from '@iconify/react';

import './Pagination.scss';
import { TextButton } from 'Components/Shared/Buttons';
import Request from './Request';

const styles = {
  loading: css`
    font-size: 30px;
    text-align: center;
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
  filterButton: {
    container: css`
      padding: 10px;
      background: ${colors.primary};
      border-radius: 10px;
      color: ${colors.white};
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 20px;
      line-height: 20px;
      transition: all 0.2s;

      &:hover {
        background: ${colors.primaryHeavy};
      }
    `,
    icon: css`
      font-size: inherit;
      margin-right: 5px;
    `,
    text: css`
      font-size: inherit;
    `,
  },
};

export default function Movies(props) {
  const history = useHistory();

  const queries = queryString.parse(history.location.search);

  const [movies, setMovies] = useState([]);

  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      console.log('Search movies error:', error);
    },
    onResponse: response => {
      setMovies(response.data);
    },
  });

  useEffect(() => {
    sendRequest({
      api: `movie/filter?${queryString.stringify(queries)}`,
      method: 'GET',
    });
  }, []);

  const genres = useContext(GenresContext);

  const [filterVisible, setFilterVisible] = useState(false);

  const pageSize = 18;

  const [currentPage, setCurrentPage] = useState(1);

  function handlePagination(page, pageSize) {
    setCurrentPage(page);
    setOffset((page - 1) * pageSize);
  }

  const [offset, setOffset] = useState(0);

  return (
    <div className={styles.container}>
      <Filter
        queries={queries}
        onClose={() => setFilterVisible(false)}
        visible={filterVisible}
        sendRequest={sendRequest}
      />

      {genres && (
        <div className={styles.header}>
          <div className={styles.title}>
            {genres[queries.category]
              ? genres[queries.category]
              : queries.mostRated
              ? 'nhiều đánh giá nhất'
              : queries.highestStar
              ? 'điểm cao nhất'
              : queries.keyword
              ? `từ khóa "${queries.keyword}"`
              : 'mới nhất'}
          </div>

          <div
            onClick={() => setFilterVisible(true)}
            className={styles.filterButton.container}
          >
            <Icon className={styles.filterButton.icon} icon={filterIcon} />
            <div className={styles.filterButton.text}>Lọc</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Đang tải...</div>
      ) : (
        <React.Fragment>
          <Pagination
            current={currentPage}
            onChange={handlePagination}
            pageSize={pageSize}
            total={movies.length}
          />

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

          <Pagination
            current={currentPage}
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

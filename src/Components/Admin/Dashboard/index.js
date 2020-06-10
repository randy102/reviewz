import React, { useState, useEffect } from 'react';
import ReviewsChart from './ReviewsChart';
import { css, cx } from 'emotion';
import { useRequest } from 'Utils/request';
import { Card } from 'antd';
import RequestsChart from './RequestsChart';
import { LoadingOutlined } from '@ant-design/icons';
import colors from 'Components/Shared/theme';

const styles = {
  count: css`
    font-size: 24px;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
    margin-bottom: 40px;

    @media (max-width: 950px) {
      grid-template-columns: 1fr;
      row-gap: 20px;
    }

    .ant-card-bordered {
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
    }
  `,
  card: css`
    color: ${colors.black};

    .ant-card-body {
      height: 198px;
      position: relative;
    }
  `,
  cardBody: css`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  number: css`
    color: ${colors.primary};
    font-size: 50px;
  `,
  requestCardGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  `,
  loadingSpinner: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.1s;

    svg {
      font-size: 100px;
      color: ${colors.primary};
    }
  `,
  hidden: css`
    opacity: 0;
  `,
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [movies, setMovies] = useState([]);

  const [requests, setRequests] = useState([]);

  const [getUsers, { loading: gettingUsers }] = useRequest({
    onError: error => {
      console.log('Get users error:', error);
    },
    onResponse: response => {
      setUsers(response.data);
    },
  });

  const [getReviews, { loading: gettingReviews }] = useRequest({
    onError: error => {
      console.log('Get users error:', error);
    },
    onResponse: response => {
      setReviews(response.data);
    },
  });

  const [getMovies, { loading: gettingMovies }] = useRequest({
    onError: error => {
      console.log('Get users error:', error);
    },
    onResponse: response => {
      setMovies(response.data);
    },
  });

  const [getRequests, { loading: gettingRequests }] = useRequest({
    onError: error => {
      console.log('Get users error:', error);
    },
    onResponse: response => {
      setRequests(response.data);
    },
  });

  // Get all 4 on mount
  useEffect(() => {
    getUsers({
      api: 'user',
      method: 'GET',
    });
    getMovies({
      api: 'movie',
      method: 'GET',
    });
    getReviews({
      api: 'review',
      method: 'GET',
    });
    getRequests({
      api: 'request',
      method: 'GET',
    });
  }, []);

  return (
    <div>
      <div className={styles.grid}>
        <Card className={styles.card} title="Người dùng">
          <LoadingOutlined
            className={cx(styles.loadingSpinner, {
              [styles.hidden]: !gettingUsers,
            })}
            spin
          />
          {!!users.length && (
            <div className={styles.cardBody}>
              <div className={styles.number}>
                {users.length.toLocaleString()}
              </div>
            </div>
          )}
        </Card>
        <Card className={styles.card} title="Phim">
          <LoadingOutlined
            className={cx(styles.loadingSpinner, {
              [styles.hidden]: !gettingMovies,
            })}
            spin
          />
          {!!movies.length && (
            <div className={styles.cardBody}>
              <div className={styles.number}>
                {movies.length.toLocaleString()}
              </div>
            </div>
          )}
        </Card>
        <Card className={styles.card} title="Đánh giá">
          <LoadingOutlined
            className={cx(styles.loadingSpinner, {
              [styles.hidden]: !gettingReviews,
            })}
            spin
          />
          {!!reviews.length && (
            <div className={styles.cardBody}>
              <div className={styles.number}>
                {reviews.length.toLocaleString()}
              </div>
            </div>
          )}
        </Card>
        <Card className={styles.card} title="Yêu cầu">
          <LoadingOutlined
            className={cx(styles.loadingSpinner, {
              [styles.hidden]: !gettingRequests,
            })}
            spin
          />
          {!!requests.length && (
            <RequestsChart requests={requests} loading={gettingRequests} />
          )}
        </Card>
      </div>
      <ReviewsChart reviews={reviews} loading={gettingReviews} />
    </div>
  );
}

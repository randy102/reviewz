import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import ReviewItem from './ReviewItem';
import LoadingSpinner from './LoadingSpinner';
import { useRequest } from 'Utils/request';
import { Form } from 'antd';

const styles = {
  container: css`
    margin-top: 30px;
  `,
  header: css`
    font-size: 30px;
    line-height: 35px;
    margin-bottom: 10px;
  `,
};

export default function UserReviews(props) {
  const { movieId, gettingDetails } = props;

  // Reviews
  const [reviews, setReviews] = useState([]);

  // Get reviews
  const [getReviews, { loading: gettingReviews }] = useRequest({
    onError: error => console.log('Get reviews error:', error),
    onResponse: response => setReviews(response.data),
  });

  // Get reviews when movie id is ready
  useEffect(() => {
    if (!movieId) {
      return;
    }

    getReviews({
      api: `review/movie/${movieId}`,
      method: 'GET',
    });
  }, [movieId]);

  return (
    <Form>
      <Form.Item>
        <h1>Tất cả đánh giá</h1>
      </Form.Item>

      {gettingDetails || gettingReviews ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          {reviews
            .filter(review => review.verified)
            .map(review => (
              <Form.Item key={review.id}>
                <ReviewItem review={review} />
              </Form.Item>
            ))}
        </React.Fragment>
      )}
    </Form>
  );
}

import React from 'react';
import { css, cx } from 'emotion';
import Avatar from 'Components/Shared/Avatar';
import ReviewItem from './ReviewItem';

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
  const { reviews } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Reviews</div>
      <div>
        {reviews
          .filter(review => review.verified)
          .map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
      </div>
    </div>
  );
}

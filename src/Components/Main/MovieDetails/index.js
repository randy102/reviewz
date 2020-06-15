import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'Utils/request';

import Image from 'Components/Shared/Image';
import { css } from 'emotion';

import colors from 'Components/Shared/theme';
import UserReviews from './UserReviews';
import YourReview from './YourReview';
import { Divider } from 'antd';
import Details from './Details';

const styles = {
  container: css`
    max-width: 1174px;
    margin: 0 auto;
    color: ${colors.black};
  `,
  detailsContainer: css`
    display: flex;
  `,
  poster: css`
    flex-shrink: 0;
    width: 378px;
    height: 567px;
    margin-right: 20px;
  `,
};

export default function MovieDetails() {
  let { id } = useParams();

  // Movie details
  const [details, setDetails] = useState();

  // Get movie details
  const [getDetails, { loading }] = useRequest({
    onError: error => console.log('Get movie details error:', error),
    onResponse: response => setDetails(response.data),
  });

  // On mount
  useEffect(() => {
    // Get movie details
    getDetails({
      api: `movie/detail/${id}`,
      method: 'GET',
    });
  }, []);

  return (
    <div className={styles.container}>
      {/* Details */}
      <div className={styles.detailsContainer}>
        {/* Movie poster */}
        <div className={styles.poster}>
          <Image id={details?.img} />
        </div>

        {/* Movie details */}
        <Details gettingDetails={loading} details={details} />
      </div>

      <Divider />

      <YourReview gettingDetails={loading} movieId={details?.id} />

      <Divider />

      <UserReviews gettingDetails={loading} movieId={details?.id} />
    </div>
  );
}

import React from 'react';
import { css } from 'emotion';
import Avatar from 'Components/Shared/Avatar';
import colors from 'Components/Shared/colors';
import Color from 'color';
import unixToDate from 'Utils/unixToDate';

import Icon from '@iconify/react';
import starTwotone from '@iconify/icons-ant-design/star-twotone';

const styles = {
  container: css`
    display: grid;
    row-gap: 10px;
    padding: 15px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15), 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-top: 30px;
  `,
  header: css`
    display: flex;
    align-items: center;
  `,
  avatar: css`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 10px;
    background: ${colors.imgPlaceholder};
  `,
  username: css`
    font-size: 16px;
    line-height: 100%;
    color: ${colors.black};
    margin-bottom: 5px;
  `,
  date: css`
    font-size: 13px;
    line-height: 100%;
    color: ${Color(colors.black).alpha(0.6).string()};
    font-style: italic;
  `,
  rating: css`
    display: flex;
    color: ${colors.primary};
    font-size: 20px;
    line-height: 100%;
  `,
  star: css`
    font-size: inherit;
    margin-right: 3px;

    path:first-child {
      color: ${colors.secondary};
      fill-opacity: 1;
    }

    path:last-child {
      color: ${colors.primary};
    }
  `,
  score: css`
    font-size: inherit;
  `,
  content: css`
    font-size: 16px;
  `,
};

export default function ReviewItem(props) {
  const { review } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Avatar id={review.user.img} />
        </div>
        <div>
          <div className={styles.username}>{review.user.username}</div>
          <div className={styles.date}>{unixToDate(review.createdAt)}</div>
        </div>
      </div>

      <div className={styles.rating}>
        <Icon className={styles.star} icon={starTwotone} />
        <div className={styles.score}>{review.star}</div>
      </div>

      <div className={styles.content}>{review.content}</div>
    </div>
  );
}

import React from 'react';
import { css } from 'emotion';
import { useHistory, Link } from 'react-router-dom';
import colors from 'Components/Shared/theme';

const styles = css`
  padding: 5px;
  background: ${colors.imgPlaceholder};
  color: ${colors.black};
  transition: all 0.15s ease-out;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  line-height: 19px;

  &:hover {
    background: ${colors.primary};
    color: ${colors.secondary};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default function GenreItem(props) {
  const { genreId, genres } = props;

  return (
    <Link to={`/search/?category=${genreId}`} className={styles}>
      {genres ? genres[genreId] : 'Đang tải...'}
    </Link>
  );
}

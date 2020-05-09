import React from 'react';
import { css } from 'emotion';
import { useHistory } from 'react-router-dom';
import colors from 'Components/Shared/colors';

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

  const history = useHistory();

  function handleClick() {
    history.push({
      pathname: '/search',
      genre: genreId,
    });
  }

  return (
    <div onClick={handleClick} className={styles}>
      {genres[genreId]}
    </div>
  );
}

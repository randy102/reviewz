import React, { useEffect, useState, useRef } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { useRequest } from 'Utils/request';
import { css, cx } from 'emotion';

import MovieItem from '../MovieItem';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import colors from 'Components/Shared/colors';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';

const styles = {
  container: css`
    max-width: 1174px;
    margin: 0 auto;
    position: relative;
    height: 538px;
  `,
  labelContainer: css`
    display: flex;
    margin-bottom: 20px;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.primary};
  `,
  label: css`
    font-size: 22px;
    line-height: 22px;
    font-weight: bold;
    color: ${colors.white};
    background: ${colors.primary};
    padding: 10px;
    justify-self: left;
  `,
  more: css`
    cursor: pointer;
    color: ${colors.primary};
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 5px;
    transition: all 0.2s;

    &:hover {
      color: ${colors.primaryHeavy};
    }
  `,
  button: css`
    position: absolute;
    background: ${colors.primary};
    height: 100px;
    top: 50%;
    outline: none;
    color: ${colors.white};
    border-radius: 999px;

    &:focus {
      outline: none;
    }

    &:hover {
      color: ${colors.secondary};
    }
  `,
  chevron: css`
    color: inherit;
    font-size: 35px;
    transition: all 0.2s;
  `,
  left: css`
    left: 0;
    transform: translate(calc(-50% - 48px), -50%);
  `,
  right: css`
    right: 0;
    transform: translate(calc(50% + 48px), -50%);
  `,
};

export default function HomeCarousel(props) {
  // Props destructuring
  const { params, label, more, autoplay = false } = props;

  // Movies (get from API)
  const [movies, setMovies] = useState([]);

  // Request movies
  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Get movies error:', error);
    },
    onResponse: response => {
      setMovies(response.data);
    },
  });

  // Get movies
  useEffect(() => {
    sendRequest({
      api: `movie/filter/${params}`,
      method: 'GET',
    });
  }, []);

  const sliderRef = useRef();

  return (
    <div className={styles.container}>
      {movies.length > 0 && (
        <React.Fragment>
          <div className={styles.labelContainer}>
            <div className={styles.label}>{label.toUpperCase()}</div>
            <Link to={more} className={styles.more}>
              Xem thêm
            </Link>
          </div>
          <Slider
            ref={sliderRef}
            dots={false}
            infinite={true}
            arrows={false}
            speed={1000}
            slidesToShow={4}
            slidesToScroll={4}
            autoplay={autoplay}
            autoplaySpeed={3000}
            draggable={false}
          >
            {movies.map((movie, index) => (
              <div key={movie.id}>
                <div style={{ margin: '0 7.5px' }}>
                  <MovieItem key={movie.id} movie={movie} />
                </div>
              </div>
            ))}
          </Slider>
          <button
            className={cx(styles.button, styles.left)}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <Icon className={styles.chevron} icon={chevronLeft} />
          </button>
          <button
            className={cx(styles.button, styles.right)}
            onClick={() => sliderRef.current.slickNext()}
          >
            <Icon className={styles.chevron} icon={chevronRight} />
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

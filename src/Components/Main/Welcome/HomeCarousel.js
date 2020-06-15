import React, { useEffect, useState, useRef } from 'react';

import { Link } from 'react-router-dom';
import { useRequest } from 'Utils/request';
import { css, cx } from 'emotion';

import MovieItem from '../MovieItem';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import colors from 'Components/Shared/theme';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';

const styles = {
  container: css`
    max-width: 1174px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: 538px;
    font-family: Roboto;
    font-size: 16px;
  `,
  labelContainer: css`
    display: flex;
    margin-bottom: 20px;
    align-items: flex-end;
    justify-content: space-between;
    box-shadow: 0px -1px 0px ${colors.primary} inset;
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
    display: flex;
    align-items: center;
    cursor: pointer;
    background: ${colors.primary};
    height: 100px;
    top: 50%;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
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
    transform: translate(-160%, -50%);
  `,
  right: css`
    right: 0;
    transform: translate(160%, -50%);
  `,
  slidesMargin: css`
    margin: 0 7.5px;
  `,
  skeleton: css`
    width: 100%;
    display: flex;
  `,
};

export default function HomeCarousel(props) {
  // Props destructuring
  const { params, label, more, autoplay = false } = props;

  // Movies (get from API)
  const [movies, setMovies] = useState();

  // Disable clicking links until data is loaded
  const [disableClicks, setDisableClicks] = useState(true);

  // Request movies
  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      console.log('Get movies error:', error);
    },
    onResponse: response => {
      setMovies(response.data);
      setDisableClicks(false);
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
      <div className={styles.labelContainer}>
        {/* Carousel label */}
        <div className={styles.label}>{label.toUpperCase()}</div>

        {/* Watch more */}
        <Link to={more} className={styles.more}>
          Xem thêm
        </Link>
      </div>

      {movies ? (
        <Slider
          ref={sliderRef}
          dots={false}
          infinite
          arrows={false}
          speed={1000}
          slidesToShow={4}
          slidesToScroll={4}
          autoplay={autoplay && !loading}
          autoplaySpeed={3000}
        >
          {movies.map(movie => (
            <div key={movie.id}>
              <div className={styles.slidesMargin}>
                <MovieItem disabled={disableClicks} movie={movie} />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className={styles.skeleton}>
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className={styles.slidesMargin}>
                <MovieItem loading disabled={disableClicks} movie={{}} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Previous button */}
      <button
        className={cx(styles.button, styles.left)}
        onClick={movies && (() => sliderRef.current.slickPrev())}
      >
        <Icon className={styles.chevron} icon={chevronLeft} />
      </button>

      {/* Next button */}
      <button
        className={cx(styles.button, styles.right)}
        onClick={movies && (() => sliderRef.current.slickNext())}
      >
        <Icon className={styles.chevron} icon={chevronRight} />
      </button>
    </div>
  );
}

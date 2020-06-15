import React from 'react';
import { Row, Col } from 'antd';
import unixToDate from 'Utils/helpers/unixToDate';
import { Link } from 'react-router-dom';
import AvgScore from './AvgScore';
import { css } from 'emotion';
import LoadingSpinner from './LoadingSpinner';

const styles = {
  details: css`
    display: flex;
    flex-direction: column;
    font-size: 16px;
  `,
  movieName: css`
    font-size: 30px;
    line-height: 35px;
  `,
};

const rowProps = {
  gutter: [16, 16],
};

const labelSpan = 5;

export default function (props) {
  const { gettingDetails, details = {} } = props;

  if (gettingDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.details}>
      <React.Fragment>
        {/* Release date */}
        <Row {...rowProps}>
          <Col span={24}>
            {/* English name */}
            <div className={styles.movieName}>{details.nameEn}</div>

            {/* Vietnamese name */}
            <div className={styles.movieName}>({details.nameVn})</div>
          </Col>
        </Row>

        {/* Release date */}
        <Row {...rowProps}>
          <Col span={labelSpan}>Ngày ra mắt:</Col>
          <Col span={24 - labelSpan}>{unixToDate(details.releaseDate)}</Col>
        </Row>

        {/* Categories */}
        <Row {...rowProps}>
          <Col span={labelSpan}>Thể loại:</Col>
          <Col span={24 - labelSpan}>
            {details.categoriesObj?.map(({ id, name }, index) => (
              <span key={id}>
                {index > 0 && ', '}
                <Link to={`/search/?category=${id}`}>{name}</Link>
              </span>
            ))}
          </Col>
        </Row>

        {/* Actors */}
        <Row {...rowProps}>
          <Col span={labelSpan}>Diễn viên:</Col>
          <Col span={24 - labelSpan}>
            {details.actorsObj?.map(({ id, name }, index) => (
              <span key={id}>
                {index > 0 && ', '}
                <Link to={`/search/?actor=${id}`}>{name}</Link>
              </span>
            ))}
          </Col>
        </Row>

        {/* Directors */}
        <Row {...rowProps}>
          <Col span={labelSpan}>Đạo diễn:</Col>
          <Col span={24 - labelSpan}>
            {details.directorsObj?.map(({ id, name }, index) => (
              <span key={id}>
                {index > 0 && ', '}
                <Link to={`/search/?director=${id}`}>{name}</Link>
              </span>
            ))}
          </Col>
        </Row>

        {/* Summary */}
        <Row {...rowProps}>
          <Col span={labelSpan}>Sơ lược:</Col>
          <Col span={24 - labelSpan}>{details.summary}</Col>
        </Row>

        {/* Number of reviews */}
        <Row {...rowProps} align="middle">
          <Col span={labelSpan}>Lượt review:</Col>
          <Col span={24 - labelSpan}>{details.rated} lượt</Col>
        </Row>

        {/* Average score */}
        <Row {...rowProps} align="middle">
          <Col span={labelSpan}>Điểm trung bình:</Col>
          <Col span={24 - labelSpan}>
            <AvgScore starAvg={details.starAvg} rated={details.rated} />
          </Col>
        </Row>
      </React.Fragment>
    </div>
  );
}

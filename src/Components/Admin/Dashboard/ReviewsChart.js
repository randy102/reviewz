import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

import colors from 'Components/Shared/theme';

import moment from 'moment';
import { useRequest } from 'Utils/request';

import { useRef } from 'react';
import { css, cx } from 'emotion';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const { Option } = Select;

const styles = {
  chartContainer: css`
    position: relative;
    width: 100%;
  `,
  header: css`
    display: flex;
    align-items: center;
    font-size: 24px;
    margin-bottom: 15px;
  `,
  selectContainer: css`
    margin: 0 10px;
  `,
  select: css`
    margin-left: 5px;

    .ant-select-selection-item {
      font-size: 24px;
    }
  `,
  loadingSpinner: css`
    position: absolute;
    top: calc(50% - 23px);
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
      font-size: 100px;
      color: ${colors.primary};
    }
  `,
  responsiveChart: css`
    position: relative;
    width: 100%;
    min-height: 450px;
  `,
  hidden: css`
    opacity: 0;
  `,
};

const monthFormat = 'M/YYYY';
const dayFormat = 'D/M/YYYY';

let reviewsLineStyle = {
  label: 'Lượt đánh giá',
  fill: false,
  cubicInterpolationMode: 'monotone',
  backgroundColor: colors.primary,
  borderColor: colors.primary,
  borderCapStyle: 'round',
  borderJoinStyle: 'round',
  pointRadius: 5,
  pointBorderColor: colors.white,
  pointBackgroundColor: colors.primary,
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: colors.white,
  pointHoverBorderColor: colors.primary,
  pointHoverBorderWidth: 1,
};

let chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: monthFormat,
            week: dayFormat,
          },
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: value => value.toLocaleString(),
        },
      },
    ],
  },
  tooltips: {
    displayColors: false,
    xPadding: 10,
    yPadding: 10,
    callbacks: {
      title: tooltipItem => {
        let from = moment(tooltipItem[0].label);
        let to = moment(from).add(6, 'days');
        return `${from.format(dayFormat)} - ${to.format(dayFormat)}`;
      },
      label: tooltipItem =>
        `${tooltipItem.yLabel.toLocaleString()} lượt đánh giá`,
    },
  },
  layout: {
    padding: {
      top: 0,
      left: 0,
      right: 6,
      bottom: 0,
    },
  },
};

export default function ({ reviews = [], loading }) {
  // Value for select
  const [selectValue, setSelectValue] = useState('6 months');

  // Review count
  const [reviewCount, setReviewCount] = useState([]);

  // Update review count when reviews change
  useEffect(() => {
    setReviewCount(
      reviews.reduce((acc, review) => {
        // Get the week of this review
        let weekStart = moment
          .utc(review.createdAt)
          .startOf('week')
          .format(dayFormat);

        // Update review count for that week
        acc.set(weekStart, acc.get(weekStart) + 1 || 1);

        return acc;
      }, new Map())
    );
  }, [reviews]);

  // Review data to display on chart
  const [reviewData, setReviewData] = useState(new Map());

  // Update chart display when select value changes
  useEffect(() => {
    let { time } = chartOptions.scales.xAxes[0];

    // Default
    time.unit = 'month';
    time.stepSize = 1;
    reviewsLineStyle.pointBorderColor = colors.white;
    reviewsLineStyle.pointBackgroundColor = colors.primary;

    // Change axis unit based on select value
    switch (selectValue) {
      case '1 month':
        time.unit = 'week';
        break;
      case '1 year':
        time.stepSize = 3;
        break;
      case '2 years':
        time.stepSize = 6;
        reviewsLineStyle.pointBorderColor = 'transparent';
        reviewsLineStyle.pointBackgroundColor = 'transparent';
        break;
      case '5 years':
        time.unit = 'year';
        reviewsLineStyle.pointBorderColor = 'transparent';
        reviewsLineStyle.pointBackgroundColor = 'transparent';
        break;
      default:
        break;
    }

    // Get the current week
    let thisWeek = moment.utc().startOf('week');

    // Get time amount and time unit from select
    let [amount, unit] = selectValue.split(' ');

    // Get the start week by subtracting the current week with the amount and time
    let startWeek = moment(thisWeek).subtract(amount, unit);

    // Calculate number of weeks from start week to this week
    let numberOfWeeks = thisWeek.diff(startWeek, 'weeks');

    // Create new review data
    let reviewData = new Map();

    // Set default count to 0 for all weeks displayed on chart
    while (numberOfWeeks--) {
      thisWeek.subtract(1, 'week');
      reviewData.set(thisWeek.format(dayFormat), 0);
    }

    // Loop through all weeks of reviewCount
    for (let [weekStart, count] of reviewCount) {
      // If the chart is displaying this week
      if (reviewData.has(weekStart)) {
        // Update the count of that week
        reviewData.set(weekStart, count);
      }
    }

    setReviewData(reviewData);
  }, [selectValue]);

  // Update chart data when has review count
  useEffect(() => {
    if (!reviewCount.size) return;

    let newData = new Map(reviewData);

    // Loop through all weeks of reviewCount
    for (let [weekStart, count] of reviewCount) {
      // If the chart is displaying this week
      if (newData.has(weekStart)) {
        // Update the count of that week
        newData.set(weekStart, count);
      }
    }

    setReviewData(newData);
  }, [reviewCount]);

  const data = {
    datasets: [
      {
        ...reviewsLineStyle,
        data: [...reviewData].map(([weekStart, count]) => ({
          x: moment(weekStart, dayFormat),
          y: count,
        })),
      },
    ],
  };

  return (
    <div>
      <div className={styles.header}>
        Lượt đánh giá trong
        <div className={styles.selectContainer}>
          <Select
            className={styles.select}
            value={selectValue}
            onChange={value => setSelectValue(value)}
            size="large"
          >
            <Option value="1 month">1 tháng</Option>
            <Option value="3 months">3 tháng</Option>
            <Option value="6 months">6 tháng</Option>
            <Option value="1 year">1 năm</Option>
            <Option value="2 years">2 năm</Option>
            <Option value="5 years">5 năm</Option>
          </Select>
        </div>
        gần đây:
      </div>
      <div className={styles.chartContainer}>
        <LoadingOutlined
          className={cx(styles.loadingSpinner, {
            [styles.hidden]: !loading,
          })}
          spin
        />
        <div className={styles.responsiveChart}>
          <Line data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

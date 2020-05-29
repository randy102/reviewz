import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';

const styles = {
  chartContainer: css`
    margin: 0 auto;
    position: relative;
    max-width: 150px;
  `,
  middle: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: ${colors.primary};
    opacity: 0;
    transition: opacity 0.2s;
  `,
  loadingSpinner: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
      font-size: 100px;
      color: ${colors.primary};
    }
  `,
};

export default function ({ requests = [], loading }) {
  const resolved = requests.filter(request => request.resolved).length;

  const chartOptions = {
    cutoutPercentage: 70,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      displayColors: false,
      xPadding: 10,
      yPadding: 10,
    },
    title: {
      display: true,
      text: `Đã giải quyết ${((resolved * 100) / requests.length).toFixed(0)}%`,
      fontFamily: 'Roboto',
      fontSize: 16,
      fontColor: colors.primary,
    },
  };

  const data = {
    labels: ['Đã giải quyết', 'Chưa giải quyết'],
    datasets: [
      {
        backgroundColor: [colors.primary, colors.imgPlaceholder],
        data: [resolved, requests.length - resolved],
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Doughnut options={chartOptions} data={data} />
    </div>
  );
}

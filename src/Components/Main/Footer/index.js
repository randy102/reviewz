import React from 'react';
import { css } from 'emotion';
import colors from 'Components/Shared/colors';
import Brand from '../Header/Brand';
import { useHistory } from 'react-router-dom';

const styles = {
  outer: css`
    background: ${colors.primary};
    color: ${colors.white};
    margin-top: 50px;
  `,
  inner: css`
    max-width: 1174px;
    background: transparent;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  brandName: css`
    font-size: 40px;
    line-height: 40px;
    height: fit-content;
    font-family: Courgette;
    cursor: pointer;
    color: ${colors.secondary};
  `,
};

export default function Footer() {
  const history = useHistory();

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div onClick={() => history.push('/')} className={styles.brandName}>
          Reviewz
        </div>
        <div>
          <b>Các thành viên nhóm</b>
          <div>Trần Quang (Backend)</div>
          <div>Trần Minh Chiến (Backend)</div>
          <div>Bùi Trung Bảo (Frontend)</div>
        </div>
        <div>
          <div>
            <b>Backend:</b> Spring Boot
          </div>
          <div>
            <b>Frontend:</b> ReactJS
          </div>
        </div>
      </div>
    </div>
  );
}

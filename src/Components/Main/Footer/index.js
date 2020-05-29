import React from 'react';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  `,
  brandName: css`
    font-size: 40px;
    line-height: 40px;
    height: fit-content;
    font-family: Courgette;
    color: ${colors.secondary};
    justify-self: center;
  `,
  frameworks: css`
    justify-self: end;
  `,
};

export default function Footer() {
  const history = useHistory();

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div>
          <b>Các thành viên nhóm</b>
          <div>Trần Quang (Backend)</div>
          <div>Trần Minh Chiến (Backend)</div>
          <div>Bùi Trung Bảo (Frontend)</div>
        </div>
        <div onClick={() => history.push('/')} className={styles.brandName}>
          Reviewz
        </div>
        <div className={styles.frameworks}>
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

import React from 'react';
import { css } from 'emotion';
import { useHistory, Link } from 'react-router-dom';

import colors from 'Components/Shared/colors';

const styles = css`
  margin-top: 20px;

  div {
    font-size: 20px;
    color: ${colors.black};
  }

  a {
    font-size: 20px;
    color: ${colors.primary};
    transition: all 0.1s;

    &:hover {
      color: ${colors.primaryLight};
    }
  }
`;

export default function NotLoggedIn() {
  const history = useHistory();

  return (
    <div className={styles}>
      <div>Bạn chưa đăng nhập.</div>
      <div>
        <Link
          to={{
            pathname: '/login',
            prevPath: history.location.pathname,
          }}
        >
          {'Đăng nhập '}
        </Link>
        để viết review.
      </div>
      <div>
        Chưa có tài khoản?
        <Link
          to={{
            pathname: '/register',
            prevPath: history.location.pathname,
          }}
        >
          {' Đăng ký ngay!'}
        </Link>
      </div>
    </div>
  );
}

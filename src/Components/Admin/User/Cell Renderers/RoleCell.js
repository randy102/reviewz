import React, { useState } from 'react';

import { useRequest } from 'Utils/request/';

import { getCurrentUser, setToken } from 'Utils/auth';

import { useHistory } from 'react-router-dom';

import { cx } from 'emotion';

import styles from 'SCSS/UserList.module.scss';

const AdminToggle = React.forwardRef((props, ref) => {
  // Props destructuring
  const { name, userId, isAdmin, username, gridApi, className, style } = props;

  // Toggle state
  const [checked, setChecked] = useState(
    isAdmin
    // user ? user.roles[0].role === 'ROLE_ADMIN' : false
  );

  // The selected user is the current user
  const selectedIsCurrent = userId === getCurrentUser().id;

  // History
  const history = useHistory();

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      gridApi.hideOverlay();
      if (selectedIsCurrent) {
        setToken(response.data);
        history.push('/');
      }
    },
    onError: error => {
      gridApi.hideOverlay();
      console.log('Change role error:', error);
    },
  });

  // On switch toggle
  function onChange() {
    if (username) {
      if (
        !window.confirm(
          `${
            checked
              ? `Bạn có chắc là muốn loại bỏ quyền Admin của tài khoản ${username}?`
              : `Bạn có chắc là muốn cấp quyền Admin cho tài khoản ${username}?`
          }${
            selectedIsCurrent ? '\n\nCẢNH BÁO: ĐÂY LÀ TÀI KHOẢN CỦA BẠN.' : ''
          }`
        )
      ) {
        return;
      }

      sendRequest({
        api: `user/${userId}`,
        method: 'PUT',
        data: {
          role: !checked ? 'ROLE_ADMIN' : 'ROLE_USER',
        },
      });

      gridApi.showLoadingOverlay();
    }

    setChecked(!checked);
  }

  return (
    <label
      style={{ transform: 'scale(0.8)' }}
      className={cx(styles.switch, className)}
    >
      <input
        name={name}
        ref={ref}
        checked={checked}
        type="checkbox"
        onChange={onChange}
      />
      <span className={styles.slider}></span>
    </label>
  );
});

export default AdminToggle;

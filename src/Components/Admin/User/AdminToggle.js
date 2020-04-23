import React, { useState } from 'react';

import { useRequest } from 'Utils/request/';

import { getCurrentUser, setToken } from 'Utils/auth';

import { useHistory } from 'react-router-dom';

import styles from 'SCSS/UserList.module.scss';

const AdminToggle = React.forwardRef((props, ref) => {
  // Props destructuring
  const {
    name,
    user,
    onClick = () => null,
    onDone = () => null,
    style,
  } = props;

  // Toggle state
  const [checked, setChecked] = useState(
    user ? user.roles[0].role === 'ROLE_ADMIN' : false
  );

  // The selected user is the current user
  const selectedIsCurrent = user ? user.id === getCurrentUser().id : false;

  // History
  const history = useHistory();

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      if (selectedIsCurrent) {
        setToken(response.data);
        history.push('/');
      }
      onDone();
    },
    onError: error => {
      console.log('Change role error:', error);
      onDone();
    },
  });

  // On switch toggle
  function onChange() {
    if (user) {
      if (
        !window.confirm(
          `${
            checked
              ? `Bạn có chắc là muốn loại bỏ quyền Admin của tài khoản ${user.username}?`
              : `Bạn có chắc là muốn cấp quyền Admin cho tài khoản ${user.username}?`
          }${
            selectedIsCurrent ? '\n\nCẢNH BÁO: ĐÂY LÀ TÀI KHOẢN CỦA BẠN.' : ''
          }`
        )
      ) {
        return;
      }

      sendRequest({
        api: `user/${user.id}`,
        method: 'PUT',
        data: {
          role: !checked ? 'ROLE_ADMIN' : 'ROLE_USER',
        },
      });
    }

    onClick();
    setChecked(!checked);
  }

  return (
    <label className={styles.switch} style={style}>
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

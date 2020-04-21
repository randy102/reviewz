import React, { useState } from 'react';

import { useRequest } from 'Utils/request/';

import { getCurrentUser, setToken } from 'Utils/auth';

import { useHistory } from 'react-router-dom';

import styles from 'SCSS/UserList.module.scss';

const AdminToggle = React.forwardRef((props, ref) => {
  const {
    initial = false,
    name,
    userId,
    onClick = () => null,
    onDone = () => null,
    style,
  } = props;
  const [checked, setChecked] = useState(initial);

  const selectedIsCurrent = userId === getCurrentUser().id;

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
    if (
      !window.confirm(
        `Are you sure you want to change this account's role?${
          selectedIsCurrent ? '\n\nWARNING: THIS IS YOUR CURRENT ACCOUNT.' : ''
        }`
      )
    ) {
      return;
    }
    onClick();
    setChecked(!checked);
    sendRequest({
      api: `user/${userId}`,
      method: 'PUT',
      data: {
        role: !checked ? 'ROLE_ADMIN' : 'ROLE_USER',
      },
    });
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

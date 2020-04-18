import React, { useState, useEffect } from 'react';

import { useEditRequest } from 'Utils/request/useEditRequest';

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

  // Request
  const { sendEditRequest } = useEditRequest({
    onResponse: response => {
      console.log('Change role response:', response);
      onDone();
    },
    onError: error => {
      console.log('Change role error:', error);
    },
  });

  // On switch toggle
  function onChange() {
    onClick();
    setChecked(!checked);
    sendEditRequest({
      role: checked ? 'ROLE_ADMIN' : 'ROLE_USER',
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

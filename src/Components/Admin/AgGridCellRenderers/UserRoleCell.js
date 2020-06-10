import React, { useState } from 'react';

import { useRequest } from 'Utils/request/';

import { getCurrentUser } from 'Utils/auth';

import { Popconfirm, Switch, Tooltip } from 'antd';

export default function (props) {
  // Props destructuring
  const { defaultChecked, userId, refetch } = props;

  // Switch state
  const [checked, setChecked] = useState(defaultChecked);

  // Request
  const [sendRequest, { loading }] = useRequest({
    // Update success
    onResponse: () => {
      // Change switch state
      setChecked(!checked);

      // Refetch users
      refetch();
    },
    onError: error => console.log('Change role error:', error),
  });

  // On confirm
  function handleConfirm() {
    // Send request to server to update role
    sendRequest({
      api: `user/${userId}`,
      method: 'PUT',
      data: {
        role: !checked ? 'ROLE_ADMIN' : 'ROLE_USER',
      },
    });
  }

  // If this is the current user, disable the switch
  if (userId === getCurrentUser().id) {
    // return <Switch checked={checked} disabled />;
    return (
      <Tooltip title="Bạn không thể tự thay đổi quyền quản trị của mình">
        <Switch checked={checked} disabled />
      </Tooltip>
    );
  }

  // Confirm first
  return (
    <Popconfirm
      title={
        checked
          ? 'Bỏ quyền quản trị của tài khoản này?'
          : 'Cấp quyền quản trị cho tài khoản này?'
      }
      onConfirm={handleConfirm}
      okText="Có"
      cancelText="Không"
    >
      <Switch checked={checked} loading={loading} />
    </Popconfirm>
  );
}

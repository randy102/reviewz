import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { message, Popconfirm } from 'antd';

import './AntErrorMessage.scss';

export default function (props) {
  // Props destructuring
  const { data, gridApi, refetch } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: refetch,
    onError: error => {
      console.log('Delete actor error:', error);
      switch (error.message) {
        case `actor've been used`:
          message.error('Không thể xóa vì diễn viên này đang được sử dụng.');
          break;
        default:
          message.error('Đã có lỗi xảy ra');
      }
      gridApi.hideOverlay();
    },
  });

  function deleteActor() {
    sendRequest({
      api: `actor/${data.id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return (
    <Popconfirm
      title="Xóa diễn viên này?"
      onConfirm={deleteActor}
      okText="Có"
      cancelText="Không"
    >
      <IconButton icon={deleteIcon} />
    </Popconfirm>
  );
}

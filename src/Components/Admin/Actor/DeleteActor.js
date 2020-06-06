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
      switch (error.message) {
        case `actor've been used`:
          message.error('Không thể xóa vì diễn viên này đang được sử dụng!');
          break;
        default:
          break;
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
      title="Bạn có chắc là muốn xóa diễn viên này?"
      onConfirm={deleteActor}
      okText="Có"
      cancelText="Không"
    >
      <IconButton icon={deleteIcon} />
    </Popconfirm>
  );
}

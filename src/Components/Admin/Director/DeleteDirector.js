import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { Popconfirm, message } from 'antd';

export default function (props) {
  // Props destructuring
  const { data, gridApi, refetch } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: refetch,
    onError: error => {
      switch (error.message) {
        case `director've been used`:
          message.error('Không thể xóa vì đạo diễn này đang được sử dụng!');
          break;
        default:
          break;
      }
      gridApi.hideOverlay();
    },
  });

  function deleteDirector() {
    sendRequest({
      api: `director/${data.id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return (
    <Popconfirm
      title="Bạn có chắc là muốn xóa đạo diễn này?"
      onConfirm={deleteDirector}
      okText="Có"
      cancelText="Không"
    >
      <IconButton icon={deleteIcon} />
    </Popconfirm>
  );
}

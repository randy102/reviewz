import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { Popconfirm, message } from 'antd';

export default function DeleteMovie(props) {
  // Props destructuring
  const { data, refetch, gridApi } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      refetch();
    },
    onError: error => {
      console.log('Delete movie error:', error);
      message.error('Đã có lỗi xảy ra.');
      gridApi.hideOverlay();
    },
  });

  function confirmDelete() {
    sendRequest({
      api: `movie/${data.id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return (
    <Popconfirm
      title="Bạn có chắc là muốn xóa phim này?"
      onConfirm={confirmDelete}
      okText="Có"
      cancelText="Không"
    >
      <IconButton icon={deleteIcon} />
    </Popconfirm>
  );
}

import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { Popconfirm, message } from 'antd';

export default function DeleteCategory(props) {
  // Props destructuring
  const { data, gridApi, refetch } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      refetch();
    },
    onError: error => {
      console.log('Delete error:', error);

      switch (error.message) {
        case `category've been used`:
          message.error('Không thể xóa vì thể loại này đang được sử dụng.');
          break;
        default:
          message.error('Đã có lỗi xảy ra');
      }

      gridApi.hideOverlay();
    },
  });

  function confirmDelete() {
    sendRequest({
      api: `category/${data.id}`,
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

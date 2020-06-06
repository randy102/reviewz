import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { Popconfirm } from 'antd';

export default function (props) {
  // Props destructuring
  const { data, gridApi, refetch } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: refetch,
    onError: error => console.log('Delete director error:', error),
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

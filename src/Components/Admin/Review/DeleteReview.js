import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { useRequest } from 'Utils/request';
import { Popconfirm } from 'antd';

export default function DeleteReview(props) {
  // Params destructuring
  const { id, refetch = () => null, gridApi } = props;

  // Delete request
  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Delete review error:', error);
      gridApi.hideOverlay();
    },
    onResponse: () => refetch(),
  });

  function confirmDelete() {
    sendRequest({
      api: `review/${id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return (
    <Popconfirm
      title="Xóa bài đánh giá này?"
      onConfirm={confirmDelete}
      okText="Có"
      cancelText="Không"
    >
      <IconButton icon={deleteIcon} />
    </Popconfirm>
  );
}

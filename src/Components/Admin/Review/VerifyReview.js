import React from 'react';

import { useRequest } from 'Utils/request/';

import { IconButton } from 'Components/Shared/Buttons';
import checkBold from '@iconify/icons-mdi/check-bold';
import { Popconfirm } from 'antd';

export default function VerifyReview(props) {
  // Props destructuring
  const { id, refetch, gridApi } = props;

  // Request
  const [verifyReview] = useRequest({
    onResponse: response => refetch(),
    onError: error => console.log('Verify review error:', error),
  });

  function confirmVerify() {
    verifyReview({
      api: `review/verify/${id}`,
      method: 'POST',
    });
    gridApi.showLoadingOverlay();
  }

  return (
    <Popconfirm
      title="Duyệt bài đánh giá này?"
      onConfirm={confirmVerify}
      okText="Có"
      cancelText="Không"
    >
      <IconButton icon={checkBold} />
    </Popconfirm>
  );
}

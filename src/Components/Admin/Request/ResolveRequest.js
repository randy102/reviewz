import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';

import checkBold from '@iconify/icons-mdi/check-bold';
import { useRequest } from 'Utils/request';
import { Popconfirm } from 'antd';

export default function ResolveRequest(props) {
  const { id, gridApi, refetch } = props;

  const [resolveRequest] = useRequest({
    onResponse: response => refetch(),
    onError: error => console.log('Resolve request error:', error),
  });

  function confirmResolve() {
    resolveRequest({
      api: `request/resolve/${id}`,
      method: 'POST',
    });
    gridApi.showLoadingOverlay();
  }

  return (
    <Popconfirm
      title="Yêu cầu này đã được giải quyết?"
      onConfirm={confirmResolve}
      okText="Rồi"
      cancelText="Chưa"
    >
      <IconButton icon={checkBold} />
    </Popconfirm>
  );
}

import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';

import checkBold from '@iconify/icons-mdi/check-bold';
import { useRequest } from 'Utils/request';

export default function ResolveRequest(props) {
  const { id, gridApi, refetch } = props;

  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Resolve request error:', error);
    },
    onResponse: response => {
      refetch();
    },
  });

  const handleClick = React.useCallback(() => {
    sendRequest({
      api: `request/resolve/${id}`,
      method: 'POST',
    });
    gridApi.showLoadingOverlay();
  }, [id]);

  return <IconButton onClick={handleClick} icon={checkBold} />;
}

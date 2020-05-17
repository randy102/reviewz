import React from 'react';

import { useRequest } from 'Utils/request/';

import { IconButton } from 'Components/Shared/Buttons';
import checkBold from '@iconify/icons-mdi/check-bold';

export default function VerifyReview(props) {
  // Props destructuring
  const { id, refetch, gridApi } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      console.log('verify response:', response);
      refetch();
    },
    onError: error => {
      console.log('Verify review error:', error);
    },
  });

  // On switch toggle
  function handleClick() {
    sendRequest({
      api: `review/verify/${id}`,
      method: 'POST',
    });
    gridApi.showLoadingOverlay();
  }

  return <IconButton onClick={handleClick} icon={checkBold} />;
}

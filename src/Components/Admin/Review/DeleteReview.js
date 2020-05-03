import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { useRequest } from 'Utils/request';

export default function DeleteReview({ params }) {
  // Params destructuring
  const {
    data: { id },
    context: { refetch },
    api: gridApi,
  } = params;

  // Delete request
  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Delete review error:', error);
    },
    onResponse: response => {
      // refetch();
    },
  });

  function handleClick() {
    sendRequest({
      api: `movie/${id}`,
      method: 'DELETE',
    });
    gridApi.showLoadingOverlay();
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

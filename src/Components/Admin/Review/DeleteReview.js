import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';
import { useRequest } from 'Utils/request';

export default function DeleteReview(props) {
  // Params destructuring
  const { id, refetch = () => null, gridApi } = props;

  // Delete request
  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Delete review error:', error);
    },
    onResponse: response => {
      refetch();
    },
  });

  function handleClick() {
    if (!window.confirm('Bạn có chắc là muốn xóa bài review này?')) {
      return;
    }
    sendRequest({
      api: `review/${id}`,
      method: 'DELETE',
    });

    // eslint-disable-next-line no-unused-expressions
    gridApi?.showLoadingOverlay();
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

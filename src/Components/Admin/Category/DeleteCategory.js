import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';

export default function DeleteCategory(props) {
  // Props destructuring
  const { data, gridApi, refetch } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      refetch();
    },
    onError: error => {
      console.log('Delete category error:', error);
    },
  });

  function handleClick() {
    let confirm = window.confirm(
      `Bạn có chắc là muốn xóa thể loại ${data.name}?`
    );

    if (!confirm) return;

    sendRequest({
      api: `category/${data.id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';

export default function DeleteCategory(props) {
  // Props destructuring
  const {
    category,
    setLoading = loading => loading,
    onResponse = response => response,
    onError = error => error,
  } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      onResponse(response);
    },
    onError: error => {
      console.log('Delete category error:', error);
      onError(error);
    },
  });

  function handleClick() {
    let confirm = window.confirm(
      `Bạn có chắc là muốn xóa thể loại ${category.name}?`
    );

    if (!confirm) return;

    sendRequest({
      api: `category/${category.id}`,
      method: 'DELETE',
    });

    setLoading(true);
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

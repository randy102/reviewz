import React from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';

export default function DeleteMovie(props) {
  // Props destructuring
  const { data, refetch, gridApi } = props;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      refetch();
    },
    onError: error => {
      console.log('Delete movie error:', error);
    },
  });

  function handleClick() {
    let confirm = window.confirm(
      `Bạn có chắc là muốn xóa phim ${data.nameVn}?`
    );

    if (!confirm) return;

    sendRequest({
      api: `movie/${data.id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

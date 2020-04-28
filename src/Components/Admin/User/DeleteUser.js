import React from 'react';

import { useRequest } from 'Utils/request';
import { useHistory } from 'react-router-dom';

import { getCurrentUser } from 'Utils/auth';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';

export default function DeleteUser(props) {
  // Props destructuring
  const { user, gridApi, refetch } = props;

  // Browser history
  const history = useHistory();

  // The selected user is also the current user
  const selectedIsCurrent = user.id === getCurrentUser().id;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      if (selectedIsCurrent) {
        history.push('/logout');
      } else {
        refetch();
      }
    },
    onError: error => {
      console.log('Delete user error:', error);
      gridApi.hideLoadingOverlay();
    },
  });

  function handleClick() {
    let confirm = window.confirm(
      `Bạn có chắc là muốn xóa tài khoản ${user.username}?${
        selectedIsCurrent ? '\n\nCẢNH BÁO: ĐÂY LÀ TÀI KHOẢN CỦA BẠN.' : ''
      }`
    );

    if (!confirm) return;

    sendRequest({
      api: `user/${user.id}`,
      method: 'DELETE',
    });

    gridApi.showLoadingOverlay();
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

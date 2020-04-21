import React from 'react';

import { useRequest } from 'Utils/request';
import { useHistory } from 'react-router-dom';

import { getCurrentUser } from 'Utils/auth';

import { IconButton } from 'Components/Shared/Buttons';

import deleteIcon from '@iconify/icons-mdi/delete';

export default function DeleteButton(props) {
  // Props destructuring
  const { user, onClick, onDone } = props;

  // Browser history
  const history = useHistory();

  // The selected user is also the current user
  const selectedIsCurrent = user.id === getCurrentUser().id;

  // Request
  const [sendRequest] = useRequest({
    onResponse: response => {
      if (selectedIsCurrent) {
        history.push('/logout');
      }
      onDone();
    },
    onError: error => {
      console.log('Delete user error:', error);
    },
  });

  function handleClick() {
    let confirm = window.confirm(
      `Are you sure you want to delete this account?${
        selectedIsCurrent ? '\n\nWARNING: THIS IS YOUR CURRENT ACCOUNT.' : ''
      }`
    );

    if (!confirm) return;

    onClick();

    sendRequest({
      api: `user/${user.id}`,
      method: 'DELETE',
    });
  }

  return <IconButton onClick={handleClick} icon={deleteIcon} />;
}

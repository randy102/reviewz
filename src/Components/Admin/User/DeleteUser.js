import React from 'react';

import { useEffect } from 'react';
import { useRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from 'Utils/auth/index';

import { Modal } from 'react-bootstrap';
import Loading from 'Components/Shared/Loading';

import formStyles from 'SCSS/Form.module.scss';

export default function DeleteUserModal(props) {
  const { show, onHide, onDone, userId } = props;

  // Form controller
  const { handleSubmit } = useForm();

  // Request
  const [sendRequest, loading] = useRequest({
    onError: error => {
      console.log('Delete user error:', error);
    },
    onResponse: response => {
      onHide();
      onDone();
    },
  });

  // On submit
  function onSubmit() {
    sendRequest({
      api: `user/${userId}`,
      method: 'DELETE',
    });
  }

  // Classnames
  const { grid, loading_icon } = formStyles;

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={grid}
          style={{ margin: 0 }}
        >
          <span>Are you sure you want to delete this user?</span>
          {getCurrentUser().id === userId && (
            <span>
              <strong>WARNING: </strong>This is your current account.
            </span>
          )}
          <button type="submit">
            {loading ? <Loading className={loading_icon} /> : 'Yes'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

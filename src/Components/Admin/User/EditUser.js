import React from 'react';

import { useEffect } from 'react';
import { useLazyRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from 'Utils/auth/index';

import { Modal } from 'react-bootstrap';
import { Row, ToggleSwitch } from 'Components/Shared/Form';

import Loading from 'Components/Shared/Loading';
import lockOpen from '@iconify/icons-mdi/lock-open';

import formStyles from 'SCSS/Form.module.scss';

export default function EditUserModal(props) {
  // Props
  const {
    userId, // Selected user ID
    isAdmin, // Selected user is Admin
    show, // Boolean to show modal
    onHide, // Function to hide modal
    onDone, // Function when edit is done
  } = props;

  const currentUser = getCurrentUser();

  // Request
  const [sendRequest, { data: response, error, loading }] = useLazyRequest();

  // Error
  useEffect(() => {
    if (!error) return;
    console.log('Edit user error:', error);
  }, [error]);

  // Response
  useEffect(() => {
    if (!response) return;
    onHide();
    onDone();
  }, [response]);

  // Form controller
  const { register: formRef, handleSubmit, errors } = useForm();

  // Submit
  function onSubmit({ password, isAdmin }) {
    sendRequest({
      api: `user/${userId}`,
      method: 'PUT',
      data: {
        username: '',
        password: password,
        img: '',
        isAdmin: isAdmin,
      },
    });
  }

  // Classnames
  const { grid, row, loading_icon } = formStyles;

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={grid}
          style={{
            margin: 0,
          }}
        >
          <Row
            ref={formRef}
            name="password"
            icon={lockOpen}
            placeholder="Mật khẩu"
            type="password"
            errors={errors}
          />

          <div
            className={row}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <strong>ADMIN:&nbsp;</strong>
            <ToggleSwitch
              ref={formRef}
              name="isAdmin"
              disabled={currentUser.id === userId}
              initialChecked={isAdmin}
            />
          </div>

          <button type="submit">
            {loading ? <Loading className={loading_icon} /> : 'Save Changes'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

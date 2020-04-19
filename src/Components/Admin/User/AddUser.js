import React from 'react';

import { useRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';

import { Modal } from 'react-bootstrap';
import { Row } from 'Components/Shared/Form';
import Loading from 'Components/Shared/Loading';
import AdminToggle from 'Components/Admin/User/AdminToggle';

import * as yup from 'yup';

import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';

import formStyles from 'SCSS/Form.module.scss';

export default function AddUserModal(props) {
  // Props
  const { show, onHide, onDone } = props;

  // Request
  const [sendRequest, loading] = useRequest({
    onResponse: response => {
      onHide();
      onDone();
      console.log('Add user response:', response);
    },
    onError: error => {
      if (error.message === 'User existed') {
        setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
      }
      switch (error.message) {
        case 'User existed':
          setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
          break;
        default:
          console.log('Create user error:', error);
      }
    },
  });

  // Form controller
  const {
    register: formRef,
    handleSubmit,
    errors,
    setError,
    clearError,
  } = useForm({
    validationSchema: yup.object().shape({
      username: yup.string().required('Tên đăng nhập không được bỏ trống'),
      password: yup.string().required('Mật khẩu không được bỏ trống'),
    }),
  });

  // On submit
  function onSubmit({ username, password, isAdmin }) {
    clearError();
    sendRequest({
      api: 'user',
      method: 'POST',
      data: {
        username: username,
        password: password,
        isAdmin: isAdmin,
      },
    });
  }

  // Classnames
  const { grid, row, loading_icon } = formStyles;

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
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
            icon={accountCircle}
            name="username"
            ref={formRef}
            placeholder="Tên đăng nhập"
            type="text"
            errors={errors}
          />

          <Row
            icon={lockOpen}
            name="password"
            ref={formRef}
            placeholder="Mật khẩu"
            type="password"
            errors={errors}
          />

          <div
            className={row}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <strong>ADMIN:&nbsp;</strong>
            <AdminToggle name="isAdmin" ref={formRef} />
          </div>

          <button type="submit">
            {loading ? <Loading className={loading_icon} /> : 'Create User'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

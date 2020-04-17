import React from 'react';

import { useEffect } from 'react';
import { useLazyRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';

import { Modal } from 'react-bootstrap';
import { Row, ToggleSwitch } from 'Components/Shared/Form';
import Loading from 'Components/Shared/Loading';

import * as yup from 'yup';

import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';

import formStyles from 'SCSS/Form.module.scss';

export default function AddUserModal(props) {
  // Props
  const { show, onHide, onDone } = props;

  // Request
  const [sendRequest, { data: response, error, loading }] = useLazyRequest();

  // Error
  useEffect(() => {
    if (!error) return;
    console.log('Create user error:', error);
    if (error.message === 'User existed') {
      setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
    }
  }, [error]);

  // Response
  useEffect(() => {
    if (!response) return;
    onHide();
    onDone();
  }, [response]);

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
      api: 'user/',
      method: 'POST',
      data: {
        username: username,
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
            <ToggleSwitch name="isAdmin" ref={formRef} />
          </div>

          <button type="submit">
            {loading ? <Loading className={loading_icon} /> : 'Create User'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

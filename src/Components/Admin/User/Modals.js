import React from 'react';

import { useEffect } from 'react';
import { useLazyRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from 'Utils/auth/index';

import { Modal } from 'react-bootstrap';
import { Row, ToggleSwitch } from 'Components/Shared/Form';

import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import Loading from 'Components/Shared/Loading';

import * as yup from 'yup';

import 'SCSS/Form.scss';
import 'SCSS/Modal.scss';
import 'SCSS/ToggleSwitch.scss';

export function EditUserModal(props) {
  const {
    userId,                 // Selected user ID
    isAdmin,                // Selected user is Admin
    show,                   // Boolean to show modal
    onHide,                 // Function to hide modal
    onDone,                 // Function when edit is done
  } = props;

  const currentUser = getCurrentUser();

  // Request
  const [
    sendRequest,
    { data: response, error, loading },
  ] = useLazyRequest();

  // Error
  useEffect(() => {
    if (!error) return;
    console.log('Edit user error:', error);
  }, [error])

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
    })
  }

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="grid">
          <Row
            ref={formRef}
            name="password"
            icon={lockOpen}
            placeholder="Mật khẩu"
            type="password"
            errors={errors}
          />

          <div className="row">
            <span>
              <strong>ADMIN</strong>:&nbsp;
            </span>
            <ToggleSwitch
              ref={formRef}
              name="isAdmin"
              disabled={currentUser.id === userId}
              initialChecked={isAdmin}
            />
          </div>

          <button type="submit">
            {loading ? <Loading className="loading-icon" /> : 'Save Changes'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export function AddUserModal(props) {
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
  const { register: formRef, handleSubmit, errors, setError, clearError } = useForm({
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

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="grid">
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

          <div className="row">
            <span>
              <strong>ADMIN</strong>:&nbsp;
            </span>
            <ToggleSwitch name="isAdmin" ref={formRef} />
          </div>

          <button type="submit">
            {loading ? <Loading className="loading-icon" /> : 'Create User'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export function DeleteUserModal(props) {

  const { show, onHide, onDone, userId } = props;

  const currentUser = getCurrentUser();

  // Form controller
  const { register: formRef, handleSubmit, errors } = useForm();

  // Request
  const [sendRequest, { data: response, error, loading }] = useLazyRequest();

  // Error
  useEffect(() => {
    if (!error) return;
    console.log('Delete user error:', error);
  }, [error]);

  // Response
  useEffect(() => {
    if (!response) return;
    onHide();
    onDone();
  }, [response]);

  // On submit
  function onSubmit() {
    sendRequest({
      api: `user/${userId}`,
      method: 'DELETE',
    })
  }

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="grid">
          <span>Are you sure you want to delete this account?</span>
          {currentUser.id === userId && (
            <span><strong>WARNING: </strong>This is your current account.</span>
          )}
          <button type="submit">
            {loading ? <Loading className="loading-icon" /> : 'Yes'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

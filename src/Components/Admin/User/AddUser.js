import React, { useState } from 'react';

import { useRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';

import { Modal } from 'react-bootstrap';
import TextInput from 'Components/Shared/Form/TextInput';
import Loading from 'Components/Shared/Loading';
import AdminToggle from 'Components/Admin/User/AdminToggle';
import { IconButton } from 'Components/Shared/Buttons';

import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import plusCircle from '@iconify/icons-mdi/plus-circle';

import formStyles from 'SCSS/Form.module.scss';

export default function AddUser(props) {
  // Props
  const { onDone } = props;

  const [show, setShow] = useState(false);

  // Request
  const [sendRequest, { loading }] = useRequest({
    onResponse: response => {
      setShow(false);
      onDone();
    },
    onError: error => {
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
    <>
      <IconButton
        onClick={() => setShow(true)}
        icon={plusCircle}
        text="Thêm người dùng"
      />

      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={grid}
            style={{
              margin: 0,
            }}
          >
            <TextInput
              icon={accountCircle}
              name="username"
              ref={formRef}
              placeholder="Tên đăng nhập"
              type="text"
              errors={errors}
            />

            <TextInput
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
              {loading ? <Loading className={loading_icon} /> : 'Lưu'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

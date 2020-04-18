import React from 'react';

import { useForm } from 'react-hook-form';
import { useEditRequest } from 'Utils/request/useEditRequest';
import * as yup from 'yup';

import { Modal } from 'react-bootstrap';
import { transparent_backdrop } from 'SCSS/Profile.module.scss';
import { Row } from 'Components/Shared/Form';
import Loading from 'Components/Shared/Loading';

import { setToken } from 'Utils/auth';

import styles from 'SCSS/Form.module.scss';

import accountCircle from '@iconify/icons-mdi/account-circle';

export default function EditUsername(props) {
  // Props destructuring
  const { show, onHide } = props;

  // Edit request
  const { sendEditRequest, loading } = useEditRequest({
    onError: error => {
      console.log('Edit user error:', error);
      // If user existed => Display error below username field
      if (error.message === 'User existed') {
        setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
      }
    },
    onResponse: response => {
      setToken(response.data);
      onHide();
    },
  });

  // Validation schema
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Tên đăng nhập không được bỏ trống')
      .test('numberFirst', 'Tên đăng nhập không được bắt đầu bằng số', value =>
        isNaN(value[0])
      )
      .matches(
        /^[A-Za-z0-9]+$/,
        'Tên đăng nhập chỉ được chứa chữ cái và chữ số'
      )
      .min(5, 'Tên đăng nhập tối thiểu 5 kí tự'),
  });

  // Form controller
  const {
    register: formRef,
    handleSubmit,
    errors,
    setError,
    clearError,
  } = useForm({ validationSchema: validationSchema });

  // Styles destructuring
  const { grid, loading_icon } = styles;

  // On submit
  function onSubmit({ username }) {
    clearError();
    sendEditRequest({
      username: username,
    });
  }

  return (
    <Modal
      backdropClassName={transparent_backdrop}
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Đổi tên đăng nhập</Modal.Title>
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
            ref={formRef}
            name="username"
            placeholder="Tên đăng nhập mới"
            type="text"
            errors={errors}
          />

          <button type="submit">
            {loading ? <Loading className={loading_icon} /> : 'Lưu'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

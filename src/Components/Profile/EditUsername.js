import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useLazyRequest } from 'Utils/request/index';
import * as yup from 'yup';

import { Modal } from 'react-bootstrap';
import { transparent_backdrop } from 'SCSS/Profile.module.scss';
import { Row } from 'Components/Shared/Form';
import Loading from 'Components/Shared/Loading';

import { getCurrentUser, updateToken } from 'Utils/auth';

import styles from 'SCSS/Form.module.scss';

import accountCircle from '@iconify/icons-mdi/account-circle';

export default function EditUsername(props) {
  // Props destructuring
  const { show, onHide } = props;

  // Request
  const [sendRequest, { data: response, error, loading }] = useLazyRequest();

  // Error
  useEffect(() => {
    if (!error) return;

    console.log('Edit username error:', error);
    // If user existed => Display error below username field
    if (error.message === 'User existed') {
      setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
    }
  }, [error]);

  // Response
  useEffect(() => {
    if (!response) return;

    console.log('Edit username response:', response);
    onHide();
  }, [response]);

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
    getValues,
    setError,
    clearError,
  } = useForm({ validationSchema: validationSchema });

  // Styles destructuring
  const { grid, loading_icon } = styles;

  // On submit
  function onSubmit({ username }) {
    sendRequest({
      api: `user/${getCurrentUser().id}`,
      method: 'PUT',
      data: {
        username: username,
        password: '',
        img: '',
        isAdmin: '',
      },
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

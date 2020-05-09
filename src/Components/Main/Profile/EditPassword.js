import React from 'react';

import { useForm } from 'react-hook-form';
import { useRequest } from 'Utils/request';
import * as yup from 'yup';

import { Modal } from 'react-bootstrap';
import { transparent_backdrop } from 'SCSS/Profile.module.scss';
import TextInput from 'Components/Shared/Form/TextInput';
import Loading from 'Components/Shared/Loading';

import { setToken, getCurrentUser } from 'Utils/auth';

import styles from 'SCSS/Form.module.scss';

import lockOpen from '@iconify/icons-mdi/lock-open';

export default function EditPassword(props) {
  // Props destructuring
  const { show, onHide } = props;

  // Edit request
  const [requestEdit, { loading }] = useRequest({
    onError: error => {
      console.log('Edit user error:', error);
    },
    onResponse: response => {
      setToken(response.data);
      onHide();
    },
  });

  // Validation schema
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Mật khẩu không được bỏ trống')
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$/,
        'Mật khẩu phải có ít nhất 1 chữ cái, 1 chữ số và không có kí tự đặc biệt'
      )
      .min(6, 'Mật khẩu tối thiểu 6 kí tự'),
  });

  // Form controller
  const { register: formRef, handleSubmit, errors } = useForm({
    validationSchema: validationSchema,
  });

  // Styles destructuring
  const { grid } = styles;

  // On submit
  function onSubmit({ password }) {
    requestEdit({
      api: `user/${getCurrentUser().id}`,
      method: 'PUT',
      data: {
        password: password,
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
        <Modal.Title>Đổi mật khẩu</Modal.Title>
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
            icon={lockOpen}
            ref={formRef}
            name="password"
            placeholder="Mật khẩu mới"
            type="password"
            errors={errors}
          />

          <button type="submit">{loading ? <Loading /> : 'Lưu'}</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

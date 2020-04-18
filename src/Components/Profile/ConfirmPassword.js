import React from 'react';

import { useForm } from 'react-hook-form';
import { useLoginRequest } from 'Utils/request/useLoginRequest';
import { getCurrentUser } from 'Utils/auth';

import * as yup from 'yup';

import { Row } from 'Components/Shared/Form';
import Loading from 'Components/Shared/Loading';

import { grid, loading_icon } from 'SCSS/Form.module.scss';

export default function ConfirmPassword(props) {
  // Props destructuring
  const { onResponse } = props;

  // Login request to confirm password
  const { sendLoginRequest, loading } = useLoginRequest({
    onError: error => {
      if (error.message === 'Wrong password') {
        setError('password', 'wrongPassword', 'Sai mật khẩu');
      }
    },
    onResponse: response => {
      onResponse();
    },
  });

  // Validations chema
  const validationSchema = yup.object().shape({
    password: yup.string().required('Hãy xác nhận mật khẩu'),
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

  function onSubmit({ password }) {
    clearError();
    sendLoginRequest({
      username: getCurrentUser().name,
      password: password,
    });
  }

  return (
    <div>
      <span>Xác nhận mật khẩu để mở chức năng:</span>
      <form
        style={{ margin: '10px 0 0 0' }}
        onSubmit={handleSubmit(onSubmit)}
        className={grid}
      >
        <Row
          ref={formRef}
          name="password"
          placeholder="Xác nhận mật khẩu"
          type="password"
          errors={errors}
          errorStyle={{ padding: 0 }}
        />
        <button type="submit">
          {loading ? <Loading className={loading_icon} /> : 'Xác nhận'}
        </button>
      </form>
    </div>
  );
}

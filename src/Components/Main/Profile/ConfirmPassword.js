import React from 'react';

import { useForm } from 'react-hook-form';
import { useRequest } from 'Utils/request';
import { getCurrentUser } from 'Utils/auth';

import * as yup from 'yup';

import TextInput from 'Components/Shared/Form/TextInput';
import Loading from 'Components/Shared/Loading';

import { grid } from 'SCSS/Form.module.scss';

export default function ConfirmPassword(props) {
  // Props destructuring
  const { onResponse } = props;

  // Login request to confirm password
  const [requestLogin, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Wrong password':
          setError('password', 'wrongPassword', 'Sai mật khẩu');
          break;
        default:
          console.log('Login error:', error);
      }
    },
    onResponse: response => {
      onResponse();
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
      password: yup.string().required('Hãy xác nhận mật khẩu'),
    }),
  });

  function onSubmit({ password }) {
    clearError();
    requestLogin({
      api: 'user/login',
      method: 'POST',
      data: {
        username: getCurrentUser().name,
        password: password,
      },
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
        <TextInput
          ref={formRef}
          name="password"
          placeholder="Xác nhận mật khẩu"
          type="password"
          errors={errors}
          errorStyle={{ padding: 0 }}
        />
        <button type="submit">{loading ? <Loading /> : 'Xác nhận'}</button>
      </form>
    </div>
  );
}

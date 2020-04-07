import React, { useEffect } from 'react';

import { setToken, isLogin } from '../Utils/auth';

import { Link } from 'react-router-dom';

import { useLazyRequest } from 'Utils/request';

import { useForm } from 'react-hook-form';

import { Helmet } from 'react-helmet';

import { useHistory } from 'react-router-dom';

import { errorMessage } from './Register';

import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';

import Loading from 'Components/Shared/Loading';

import * as yup from 'yup';

import 'SCSS/Form.scss';

export default function Login() {
  const history = useHistory();

  const {
    register: loginRef,
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

  const [
    sendRequest,
    { data: response, error, loading, refetch },
  ] = useLazyRequest();

  // Error
  useEffect(() => {
    if (error) {
      console.log('error:', error.message);
      switch (error.message) {
        case 'Not found: User':
          setError('username', 'notExist', 'Tên đăng nhập này không tồn tại');
          break;
        case 'Incorrect Password':
          setError('password', 'wrongPass', 'Sai mật khẩu');
          break;
        default:
          break;
      }
    }
  }, [error]);

  // Success
  useEffect(() => {
    if (response) {
      setToken(response.data);
      history.push('/');
    }
  }, [response]);

  function onSubmit(formData) {
    const { username, password } = formData;

    clearError();

    sendRequest({
      api: 'user/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    });
  }

  return (
    <div className="form-page">
      <Helmet>
        <title>Reviewz | Đăng nhập</title>
      </Helmet>

      <div className="brand-name">Reviewz</div>

      <div className="form">
        <div className="header">Đăng nhập</div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid">
          <div className="row">
            <Icon className="icon" icon={accountCircle} />
            <input
              name="username"
              ref={loginRef}
              placeholder="Tên đăng nhập"
              type="text"
            ></input>
            {errors.username && errorMessage(errors.username.message)}
          </div>

          <div className="row">
            <Icon className="icon" icon={lockOpen} />
            <input
              name="password"
              ref={loginRef}
              placeholder="Mật khẩu"
              type="password"
            ></input>
            {errors.password && errorMessage(errors.password.message)}
          </div>

          <button type="submit">
            {loading ? <Loading className="loading-icon" /> : 'Đăng nhập'}
          </button>

          <div className="alternate-link">
            <span>Chưa có tài khoản? </span>
            <Link to="/register">Đăng ký</Link>
          </div>
        </form>

        <Link to="/" className="back-to-home">
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}

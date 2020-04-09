import React, { useEffect } from 'react';
import { setToken, loggedIn } from '../Utils/auth';
import { Link } from 'react-router-dom';
import { useLazyRequest } from 'Utils/request';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Row } from './Register';
import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import Loading from 'Components/Shared/Loading';
import * as yup from 'yup';
import 'SCSS/Form.scss';

export default function Login() {
  const history = useHistory();

  // If already logged in => Redirect to homepage
  if (loggedIn()) {
    history.push('/');
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required('Tên đăng nhập không được bỏ trống'),
    password: yup.string().required('Mật khẩu không được bỏ trống'),
  });

  const {
    register: formRef,
    handleSubmit,
    errors,
    setError,
    clearError,
  } = useForm({
    validationSchema: validationSchema,
  });

  const [
    sendRequest,
    { data: response, error, loading, refetch },
  ] = useLazyRequest();

  // Login response
  useEffect(() => {
    if (!response) return;

    // Login success => Set token and redirect to Home page
    setToken(response.data);
    history.push('/');
  }, [response]);

  // Login error
  useEffect(() => {
    if (!error) return;

    switch (error.message) {
      case 'User not found':
        setError('username', 'userNotFound', 'Tên đăng nhập này không tồn tại');
        break;
      case 'Wrong password':
        setError('password', 'wrongPassword', 'Sai mật khẩu');
        break;
      default:
        break;
    }
  }, [error]);

  // On submit form => Clear all errors and send login request
  function onSubmit({ username, password }) {
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

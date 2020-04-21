import React, { useEffect } from 'react';
import { setToken, loggedIn } from '../Utils/auth';
import { Link } from 'react-router-dom';
import { useRequest } from 'Utils/request';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Row } from 'Components/Shared/Form';
import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import longArrowAltLeft from '@iconify/icons-fa-solid/long-arrow-alt-left';
import Loading from 'Components/Shared/Loading';
import * as yup from 'yup';
import styles from 'SCSS/Form.module.scss';

export default function Login() {
  const history = useHistory();

  // If already logged in => Redirect to homepage
  if (loggedIn()) {
    history.push('/');
  }

  // Form validation schema
  const validationSchema = yup.object().shape({
    username: yup.string().required('Tên đăng nhập không được bỏ trống'),
    password: yup.string().required('Mật khẩu không được bỏ trống'),
  });

  // Form controller
  const {
    register: formRef,
    handleSubmit,
    errors,
    setError,
    clearError,
  } = useForm({
    validationSchema: validationSchema,
  });

  // Login request
  const [sendRequest, { loading }] = useRequest({
    onResponse: response => {
      setToken(response.data);
      history.push('/');
    },
    onError: error => {
      switch (error.message) {
        case 'User not found':
          setError(
            'username',
            'userNotFound',
            'Tên đăng nhập này không tồn tại'
          );
          break;
        case 'Wrong password':
          setError('password', 'wrongPassword', 'Sai mật khẩu');
          break;
        default:
          console.log('Error:', error);
      }
    },
  });

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

  const {
    form_page,
    brand_name,
    form,
    header,
    grid,
    loading_icon,
    alternate_link,
    back_to_home,
  } = styles;

  return (
    <div className={form_page}>
      <Helmet>
        <title>Reviewz | Đăng nhập</title>
      </Helmet>

      <div className={brand_name}>Reviewz</div>

      <div className={form}>
        <div className={header}>Đăng nhập</div>
        <form onSubmit={handleSubmit(onSubmit)} className={grid}>
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
            {loading ? <Loading className={loading_icon} /> : 'Đăng nhập'}
          </button>
          <div className={alternate_link}>
            <span>Chưa có tài khoản? </span>
            <Link to="/register">Đăng ký</Link>
          </div>
        </form>

        <Link to="/" className={back_to_home}>
          <Icon icon={longArrowAltLeft} />
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}

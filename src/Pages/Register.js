import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import * as yup from 'yup';
import { useLazyRequest } from 'Utils/request';
import { setToken } from '../Utils/auth';
import { Row } from 'Components/Shared/Form';
import Loading from 'Components/Shared/Loading';
import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import lockOpenCheck from '@iconify/icons-mdi/lock-open-check';

import styles from 'SCSS/Form.module.scss';

export default function Register() {
  const history = useHistory();

  // Register api
  const [
    regRequest,
    {
      data: regResponse,
      loading: regLoading,
      error: regError,
      refetch: regRefetch,
    },
  ] = useLazyRequest();

  // Login api
  const [
    logRequest,
    {
      data: logResponse,
      loading: logLoading,
      error: logError,
      refetch: logRefetch,
    },
  ] = useLazyRequest();

  // Register response
  useEffect(() => {
    if (!regResponse) return;

    // Register success => Send login request
    const { username, password } = getValues();
    logRequest({
      api: 'user/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    });
  }, [regResponse]);

  // Login response
  useEffect(() => {
    if (!logResponse) return;

    // Login success => Set token and redirect to Home page
    setToken(logResponse.data);
    history.push('/');
  }, [logRequest]);

  // Register error
  useEffect(() => {
    if (!regError) return;

    // If user existed => Display error below username field
    if (regError.message === 'User existed') {
      setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
    }
  }, [regError]);

  // Login error
  useEffect(() => {
    if (!logError) return;

    console.log('Login error:', logError);
  }, [logError]);

  // On submit form => Clear all errors and send register request
  function onSubmit({ username, password }) {
    clearError();
    regRequest({
      api: 'user/register',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    });
  }

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

    password: yup
      .string()
      .required('Mật khẩu không được bỏ trống')
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$/,
        'Mật khẩu phải có ít nhất 1 chữ cái, 1 chữ số và không có kí tự đặc biệt'
      )
      .min(6, 'Mật khẩu tối thiểu 6 kí tự'),

    confirm: yup
      .string()
      .test(
        'matchPassword',
        'Xác nhận mật khẩu không đúng',
        value => value === getValues().password
      ),
  });

  const {
    register: formRef,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearError,
  } = useForm({ validationSchema: validationSchema });

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
        <title>Reviewz | Đăng ký</title>
      </Helmet>

      <div className={brand_name}>Reviewz</div>

      <div className={form}>
        <div className={header}>Đăng ký</div>

        <form onSubmit={handleSubmit(onSubmit)} className={grid}>
          <Row
            icon={accountCircle}
            ref={formRef}
            name="username"
            placeholder="Tên đăng nhập"
            type="text"
            errors={errors}
          />

          <Row
            icon={lockOpen}
            ref={formRef}
            name="password"
            placeholder="Mật khẩu"
            type="password"
            errors={errors}
          />

          <Row
            icon={lockOpenCheck}
            ref={formRef}
            name="confirm"
            placeholder="Xác nhận mật khẩu"
            type="password"
            errors={errors}
          />

          <button type="submit">
            {regLoading || logLoading ? (
              <Loading className={loading_icon} />
            ) : (
              'Đăng ký'
            )}
          </button>

          <div className={alternate_link}>
            <span>Đã có tài khoản? </span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>

        <Link to="/" className={back_to_home}>
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}

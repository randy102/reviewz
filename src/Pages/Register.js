import React from 'react';

import { useForm } from 'react-hook-form';
import { useRequest } from 'Utils/request';
import { useHistory } from 'react-router-dom';

import * as yup from 'yup';

import { setToken, loggedIn } from '../Utils/auth';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TextInput from 'Components/Shared/Form/TextInput';
import Loading from 'Components/Shared/Loading';
import { Icon } from '@iconify/react';

import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import lockOpenCheck from '@iconify/icons-mdi/lock-open-check';
import longArrowAltLeft from '@iconify/icons-fa-solid/long-arrow-alt-left';

import styles from 'SCSS/Form.module.scss';

export default function Register() {
  const history = useHistory();

  // If already logged in => Redirect to homepage
  if (loggedIn()) {
    history.push(history.location.prevPath || '/');
  }

  // Register api
  const [registerRequest, { loading: registering }] = useRequest({
    onResponse: response => {
      console.log('Register response:', response);
      const { username, password } = getValues();
      loginRequest({
        api: 'user/login',
        method: 'POST',
        data: {
          username: username,
          password: password,
        },
      });
    },
    onError: error => {
      switch (error.message) {
        case 'User existed':
          setError('username', 'userExisted', 'Tên đăng nhập này đã tồn tại');
          break;
        default:
          console.log('Register error:', error);
      }
    },
  });

  // Login api
  const [loginRequest, { loading: loggingIn }] = useRequest({
    onResponse: response => {
      setToken(response.data);
    },
    onError: error => {
      console.log('Login error:', error);
    },
  });

  // On submit form => Clear all errors and send register request
  function onSubmit({ username, password }) {
    clearError();
    registerRequest({
      api: 'user/register',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    });
  }

  const {
    register: formRef,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearError,
  } = useForm({
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required('Tên đăng nhập không được bỏ trống')
        .test(
          'numberFirst',
          'Tên đăng nhập không được bắt đầu bằng số',
          value => isNaN(value[0])
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
          'passwordMatch',
          'Xác nhận mật khẩu không đúng',
          value => value === getValues().password
        ),
    }),
  });

  return (
    <div className={styles.form_page}>
      <Helmet>
        <title>Reviewz | Đăng ký</title>
      </Helmet>

      <div className={styles.brand_name}>Reviewz</div>

      <div className={styles.form}>
        <div className={styles.header}>Đăng ký</div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.grid}>
          <TextInput
            icon={accountCircle}
            ref={formRef}
            name="username"
            placeholder="Tên đăng nhập"
            type="text"
            errors={errors}
          />

          <TextInput
            icon={lockOpen}
            ref={formRef}
            name="password"
            placeholder="Mật khẩu"
            type="password"
            errors={errors}
          />

          <TextInput
            icon={lockOpenCheck}
            ref={formRef}
            name="confirm"
            placeholder="Xác nhận mật khẩu"
            type="password"
            errors={errors}
          />

          <button type="submit">
            {registering || loggingIn ? <Loading /> : 'Đăng ký'}
          </button>

          <div className={styles.alternate_link}>
            <span>Đã có tài khoản? </span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>

        <Link to="/" className={styles.back_to_home}>
          <Icon icon={longArrowAltLeft} />
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}

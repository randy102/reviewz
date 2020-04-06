import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Helmet } from 'react-helmet';

import * as yup from 'yup';

import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-mdi/account-circle';
import lockOpen from '@iconify/icons-mdi/lock-open';
import lockOpenCheck from '@iconify/icons-mdi/lock-open-check';
import alertCircleOutline from '@iconify/icons-mdi/alert-circle-outline';

import 'SCSS/Form.scss';
import { useLazyRequest } from 'Utils/request';

export function errorMessage(message) {
  return (
    <div className="error-message">
      <Icon className="icon" icon={alertCircleOutline} />
      <div className="text"> {message}</div>
    </div>
  );
}

export default function About() {

  const [register, { data, loading, error, refetch }] = useLazyRequest();

  if (data) {
    console.log("data: ", data)
  }

  if (error) {
    console.log("error:", error)
  }

  if (loading) {
    console.log("loading");
  }

  function onSubmit(data) {
    const { username, password } = data;

    register({
      api: 'user/register',
      method: "POST",
      data: {
        username: username,
        password: password
      }
    });
  }

  const { register: registerRef, handleSubmit, errors, getValues } = useForm({
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
          'matchPassword',
          'Xác nhận mật khẩu không đúng',
          value => value === getValues().password
        ),
    }),
  });

  return (
    <div className="form-page">
      <Helmet>
        <title>Reviewz | Đăng ký</title>
      </Helmet>

      <div className="brand-name">Reviewz</div>

      <div className="form">
        <div className="header">Đăng ký</div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid">
          <div className="row">
            <Icon className="icon" icon={accountCircle} />
            <input
              ref={registerRef}
              name="username"
              placeholder="Tên đăng nhập"
              type="text"
            ></input>
            {errors.username && errorMessage(errors.username.message)}
          </div>

          <div className="row">
            <Icon className="icon" icon={lockOpen} />
            <input
              ref={registerRef}
              name="password"
              placeholder="Mật khẩu"
              type="password"
            ></input>
            {errors.password && errorMessage(errors.password.message)}
          </div>

          <div className="row">
            <Icon className="icon" icon={lockOpenCheck} />
            <input
              ref={registerRef}
              name="confirm"
              placeholder="Xác nhận mật khẩu"
              type="password"
            ></input>
            {errors.confirm && errorMessage(errors.confirm.message)}
          </div>

          <button type="submit">Đăng ký</button>

          <div className="alternate-link">
            <span>Đã có tài khoản? </span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>

        <Link to="/" className="back-to-home">
          <span> Trở về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}



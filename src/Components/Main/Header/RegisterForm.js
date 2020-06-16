import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRequest } from 'Utils/request';
import { Link } from 'react-router-dom';

export default function ({ switchTab }) {
  // Form controller
  const [form] = Form.useForm();

  // Send register request to API
  const [register, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        // If username existed
        case 'User existed':
          // Show error on Form
          form.setFields([
            {
              name: 'username',
              errors: ['Tên đăng nhập này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Register error:', error);
      }
    },
    onResponse: response => {
      // Success message
      message.success('Đăng ký thành công!');

      // Switch to Login tab
      switchToLogin();
    },
  });

  // Handle submit Form
  function handleSubmit() {
    // If validate OK
    form.validateFields().then(values => {
      // Get username and password from Form values
      const { username, password } = values;

      // Send register request to API
      register({
        api: 'user/register',
        method: 'POST',
        data: {
          username: username,
          password: password,
        },
      });
    });
  }

  function switchToLogin() {
    switchTab('login');
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {/* Username */}
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        validateFirst
        rules={[
          {
            // Required
            required: true,
            message: 'Hãy nhập tên đăng nhập',
          },
          {
            // Must not start with a number
            validator: (rule, value) =>
              isNaN(value?.[0])
                ? Promise.resolve()
                : Promise.reject('Tên đăng nhập không được bắt đầu bằng số'),
          },
          {
            // Only alphabetics and numerics
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Tên đăng nhập chỉ được chứa chữ cái và chữ số',
          },
          {
            // Minimum 5 characters
            min: 5,
            message: 'Tên đăng nhập tối thiểu 5 kí tự',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Password */}
      <Form.Item
        label="Mật khẩu"
        name="password"
        validateFirst
        rules={[
          {
            // Required
            required: true,
            message: 'Hãy nhập mật khẩu',
          },
          {
            // Must contain at least 1 alphabetic, 1 numeric and no special characters
            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$/,
            message:
              'Mật khẩu phải có ít nhất 1 chữ cái, 1 chữ số và không có kí tự đặc biệt',
          },
          { min: 6, message: 'Mật khẩu tối thiểu 6 kí tự' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* Confirm password */}
      <Form.Item
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        dependencies={['password']}
        validateFirst
        rules={[
          {
            // Required
            required: true,
            message: 'Hãy xác nhận mật khẩu mới',
          },
          {
            // Must match password
            validator: (rule, value) =>
              form.getFieldValue('password') === value
                ? Promise.resolve()
                : Promise.reject('Xác nhận mật khẩu không trùng khớp'),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* Submit button */}
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          style={{ marginTop: 22 }}
        >
          Đăng ký
        </Button>
      </Form.Item>

      {/* Submit button */}
      <Form.Item>
        Đã có tài khoản? <Link onClick={switchToLogin}>Đăng nhập ngay.</Link>
      </Form.Item>
    </Form>
  );
}

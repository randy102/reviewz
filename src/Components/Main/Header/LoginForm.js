import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRequest } from 'Utils/request';
import { setToken } from 'Utils/auth';
import { Link } from 'react-router-dom';

export default function ({ switchTab }) {
  // Form controller
  const [form] = Form.useForm();

  // Send login request to API
  const [login, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'User not found':
          form.setFields([
            {
              name: 'username',
              errors: ['Tên đăng nhập này không tồn tại'],
            },
          ]);
          break;
        case 'Invalid field: password':
          form.setFields([
            {
              name: 'password',
              errors: ['Sai mật khẩu'],
            },
          ]);
          break;
        default:
          console.log('Error:', error);
      }
    },
    onResponse: response => {
      // Success message
      message.success('Đăng nhập thành công!');

      // Set token
      setToken(response.data);

      // Reload page
      window.location.reload();
    },
  });

  function handleSubmit() {
    // If validate OK
    form.validateFields().then(values => {
      // Get username and password from Form values
      const { username, password } = values;

      // Send register request to API
      login({
        api: 'user/login',
        method: 'POST',
        data: {
          username: username,
          password: password,
        },
      });
    });
  }

  function switchToRegister() {
    switchTab('register');
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
        ]}
      >
        <Input />
      </Form.Item>

      {/* Password */}
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            // Required
            required: true,
            message: 'Hãy nhập mật khẩu',
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
          Đăng nhập
        </Button>
      </Form.Item>

      {/* Submit button */}
      <Form.Item>
        Chưa có tài khoản? <Link onClick={switchToRegister}>Đăng ký ngay.</Link>
      </Form.Item>
    </Form>
  );
}

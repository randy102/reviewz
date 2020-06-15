import React, { useState } from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import { useRequest } from 'Utils/request';
import { setToken, getCurrentUser } from 'Utils/auth';

export default function ({ updateParent }) {
  // Drawer visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  // Call API to update user
  const [updateUser, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        // If username existed
        case 'User existed':
          // Set form error
          form.setFields([
            {
              name: 'username',
              errors: ['Tên đăng nhập này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Update user error:', error);
      }
    },
    onResponse: response => {
      // Update user token
      setToken(response.data);

      // Update Parent drawer
      updateParent();

      // Close drawer and reset fields
      onClose();
    },
  });

  // Show drawer
  function showDrawer() {
    setVisible(true);
  }

  // Hide drawer
  function hideDrawer() {
    setVisible(false);
  }

  // On form validate OK => Update user with new username
  function onFinish(values) {
    updateUser({
      api: `user/${getCurrentUser().id}`,
      method: 'PUT',
      data: {
        username: values.username,
      },
    });
  }

  // Hide drawer and reset fields
  function onClose() {
    hideDrawer();
    form.resetFields();
  }

  return (
    <React.Fragment>
      <Button block onClick={showDrawer}>
        Đổi tên đăng nhập
      </Button>

      <Drawer
        width={512}
        title="Đổi tên đăng nhập"
        visible={visible}
        onClose={onClose}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          {/* New username */}
          <Form.Item
            label="Tên đăng nhập mới"
            name="username"
            validateFirst
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy nhập tên đăng nhập mới',
              },
              {
                // Must not start with a number
                validator: (rule, value) =>
                  isNaN(value?.[0])
                    ? Promise.resolve()
                    : Promise.reject(
                        'Tên đăng nhập không được bắt đầu bằng số'
                      ),
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
              {
                // Must be different from old username
                validator: (rule, value) =>
                  value !== getCurrentUser().name
                    ? Promise.resolve()
                    : Promise.reject(
                        'Tên đăng nhập mới phải khác tên đăng nhập cũ'
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Confirm new username */}
          <Form.Item
            label="Xác nhận tên đăng nhập mới"
            name="confirmUsername"
            dependencies={['username']}
            validateFirst
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy xác nhận tên đăng nhập mới',
              },
              {
                // Must match username
                validator: (rule, value) =>
                  form.getFieldValue('username') === value
                    ? Promise.resolve()
                    : Promise.reject('Xác nhận tên đăng nhập không trùng khớp'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 22 }}
              loading={loading}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </React.Fragment>
  );
}

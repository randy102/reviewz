import React, { useState } from 'react';
import { Button, Drawer, Input, Form } from 'antd';
import { useRequest } from 'Utils/request';
import { setToken, getCurrentUser } from 'Utils/auth';

export default function () {
  // Drawer visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  const [changePassword, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Invalid field: password':
          form.setFields([
            {
              name: 'oldPassword',
              errors: ['Sai mật khẩu'],
            },
          ]);
          break;
        default:
          console.log('Change password error:', error);
      }
    },
    onResponse: response => {
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

  // On Form submit
  function onFinish(values) {
    // Get old and new password
    const { oldPassword, newPassword } = values;

    // Change password
    changePassword({
      api: `user/password/${getCurrentUser().id}`,
      method: 'PUT',
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });
  }

  // Hide drawer and reset fields
  function onClose() {
    hideDrawer();
    form.resetFields();
  }

  // Check if new password confirmation is correct
  function checkConfirmNewPassword(rule, value) {
    return form.getFieldValue('newPassword') === value
      ? Promise.resolve()
      : Promise.reject('Xác nhận mật khẩu mới không trùng khớp');
  }

  return (
    <React.Fragment>
      <Button onClick={showDrawer} block>
        Đổi mật khẩu
      </Button>

      <Drawer
        width={512}
        title="Đổi tên đăng nhập"
        visible={visible}
        onClose={onClose}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          {/* Old password */}
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy nhập mật khẩu cũ',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* New password */}
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            validateFirst
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy nhập mật khẩu mới',
              },
              {
                // Must contains at least 1 alphabetic, 1 numeric and no special characters
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)+$/,
                message:
                  'Mật khẩu phải có ít nhất 1 chữ cái, 1 chữ số và không có kí tự đặc biệt',
              },
              { min: 6, message: 'Mật khẩu tối thiểu 6 kí tự' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Confirm new password */}
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            validateFirst
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy xác nhận mật khẩu mới',
              },
              {
                // Must match new password
                validator: (rule, value) =>
                  form.getFieldValue('newPassword') === value
                    ? Promise.resolve()
                    : Promise.reject('Xác nhận mật khẩu mới không trùng khớp'),
              },
            ]}
          >
            <Input.Password />
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

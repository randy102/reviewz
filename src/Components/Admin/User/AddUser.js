import React, { useState } from 'react';
import { useRequest } from 'Utils/request';
import { IconButton } from 'Components/Shared/Buttons';

import plusCircle from '@iconify/icons-mdi/plus-circle';
import { Modal, Button, Form, Input, Select, Switch } from 'antd';

export default function (props) {
  const { refetch } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  // Add user
  const [addUser, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'User existed':
          // Set error for username field
          form.setFields([
            {
              name: 'username',
              errors: ['Tên đăng nhập này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Add user error:', error);
      }
    },
    onResponse: () => {
      // Hide modal
      setVisible(false);

      // Refetch users
      refetch();
    },
  });

  // Show modal on AddUser click
  function showModal() {
    setVisible(true);
  }

  // On submit
  function handleSubmit() {
    // Validate fields
    form.validateFields().then(values => {
      // Add user
      addUser({
        api: 'user',
        method: 'POST',
        data: values,
      });
    });
  }

  // On cancel
  function handleCancel() {
    // Hide modal
    setVisible(false);

    // Reset fields
    form.resetFields();
  }

  return (
    <React.Fragment>
      <IconButton
        onClick={showModal}
        icon={plusCircle}
        text="Thêm người dùng"
      />
      <Modal
        visible={visible}
        title="Thêm người dùng"
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Hãy nhập tên đăng nhập' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            initialValue={false}
            name="isAdmin"
            label="Quyền quản trị"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

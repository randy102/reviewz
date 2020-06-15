import React, { useState } from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import { Form, Modal, Input } from 'antd';

import plusCircle from '@iconify/icons-mdi/plus-circle';
import { useRequest } from 'Utils/request';

export default function AddActor(props) {
  // Props
  const { refetch } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  // Add actor
  const [addActor, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Actor existed':
          form.setFields([
            {
              name: 'name',
              errors: ['Đạo diễn này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Add actor error:', error);
      }
    },
    onResponse: () => {
      // Close modal and reset fields
      handleCancel();
      // Refetch categories
      refetch();
    },
  });

  // Show modal
  function showModal() {
    setVisible(true);
  }

  // On cancel
  function handleCancel() {
    // Reset fields
    form.resetFields();

    // Hide modal
    setVisible(false);
  }

  // On submit
  function handleSubmit() {
    form.validateFields().then(({ name }) => {
      // Add actor if validate ok
      addActor({
        api: 'actor',
        method: 'POST',
        data: {
          name: name,
        },
      });
    });
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={plusCircle} text="Thêm diễn viên" />

      <Modal
        visible={visible}
        title="Thêm diễn viên"
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên diễn viên"
            rules={[{ required: true, message: 'Hãy nhập tên diễn viên' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

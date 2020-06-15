import React, { useState } from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import { Form, Modal, Input } from 'antd';

import plusCircle from '@iconify/icons-mdi/plus-circle';
import { useRequest } from 'Utils/request';

export default function AddDirector(props) {
  // Props
  const { refetch } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  // Add director
  const [addDirector, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Director existed':
          form.setFields([
            {
              name: 'name',
              errors: ['Đạo diễn này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Add director error:', error);
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
      // Add director if validate ok
      addDirector({
        api: 'director',
        method: 'POST',
        data: {
          name: name,
        },
      });
    });
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={plusCircle} text="Thêm đạo diễn" />

      <Modal
        visible={visible}
        title="Thêm đạo diễn"
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên đạo diễn"
            rules={[{ required: true, message: 'Hãy nhập tên đạo diễn' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

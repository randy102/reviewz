import React, { useState } from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import { Form, Modal, Input } from 'antd';

import plusCircle from '@iconify/icons-mdi/plus-circle';
import { useRequest } from 'Utils/request';

export default function AddCategory(props) {
  // Props
  const { refetch } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  // Add category
  const [addCategory, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Category existed':
          form.setFields([
            {
              name: 'name',
              errors: ['Thể loại này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Add category error:', error);
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
      // Add category if validate ok
      addCategory({
        api: 'category',
        method: 'POST',
        data: {
          name: name,
        },
      });
    });
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={plusCircle} text="Thêm thể loại" />

      <Modal
        visible={visible}
        title="Thêm thể loại"
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên thể loại"
            rules={[{ required: true, message: 'Hãy nhập tên thể loại' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

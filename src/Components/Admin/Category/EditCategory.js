import React, { useState } from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import pencilIcon from '@iconify/icons-mdi/pencil';
import { Form, Modal, Input } from 'antd';

export default function EditCategory(props) {
  // Props destructuring
  const {
    data: { name = '', id },
    refetch,
  } = props;

  // Form controller
  const [form] = Form.useForm();

  // Edit request
  const [editCategory, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        // If category existed
        case 'Category existed':
          // Show error below field
          form.setFields([
            {
              name: 'name',
              errors: ['Thể loại này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Edit category error:', error);
      }
    },
    onResponse: response => {
      // Refetch categories
      refetch();
      // Hide modal and reset fields
      handleCancel();
    },
  });

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Show modal
  function showModal() {
    setVisible(true);
  }

  // Handle submit
  function handleSubmit() {
    // Validate form then edit category
    form.validateFields().then(({ name }) => {
      editCategory({
        api: `category/${id}`,
        method: 'PUT',
        data: {
          name: name,
        },
      });
    });
  }

  // Handle cancel
  function handleCancel() {
    // Hide modal
    setVisible(false);
    // Reset form fields
    form.resetFields();
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={pencilIcon} />

      <Modal
        visible={visible}
        title="Sửa thể loại"
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            initialValue={name}
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

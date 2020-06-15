import React, { useState } from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import pencilIcon from '@iconify/icons-mdi/pencil';
import { Form, Modal, Input } from 'antd';

export default function EditActor(props) {
  // Props destructuring
  const {
    data: { name = '', id },
    refetch,
  } = props;

  // Form controller
  const [form] = Form.useForm();

  // Edit request
  const [editActor, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        // If actor existed
        case 'Actor existed':
          // Show error below field
          form.setFields([
            {
              name: 'name',
              errors: ['Diễn viên này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Edit actor error:', error);
      }
    },
    onResponse: response => {
      // Refetch actors
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
    // Validate form then edit actor
    form.validateFields().then(({ name }) => {
      editActor({
        api: `actor/${id}`,
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
        title="Sửa diễn viên"
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

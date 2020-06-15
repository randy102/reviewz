import React, { useState } from 'react';

import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';

import pencilIcon from '@iconify/icons-mdi/pencil';
import { Form, Modal, Input } from 'antd';

export default function EditDirector(props) {
  // Props destructuring
  const {
    data: { name = '', id },
    refetch,
  } = props;

  // Form controller
  const [form] = Form.useForm();

  // Edit request
  const [editDirector, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        // If director existed
        case 'Director existed':
          // Show error below field
          form.setFields([
            {
              name: 'name',
              errors: ['Đạo diễn này đã tồn tại'],
            },
          ]);
          break;
        default:
          console.log('Edit director error:', error);
      }
    },
    onResponse: response => {
      // Refetch directors
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
    // Validate form then edit director
    form.validateFields().then(({ name }) => {
      editDirector({
        api: `director/${id}`,
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
        title="Sửa đạo diễn"
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

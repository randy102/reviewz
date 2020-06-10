import React, { useState, useEffect } from 'react';

import { IconButton } from 'Components/Shared/Buttons';
import { Modal, Button, Form, Input, DatePicker, Select, Upload } from 'antd';
import removeAccent from 'Utils/helpers/removeAccent';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'Utils/request';

import plusCircle from '@iconify/icons-mdi/plus-circle';
import dateToUnix from 'Utils/helpers/dateToUnix';

const { Option } = Select;
const { TextArea } = Input;

function filterCategories(inputValue, option) {
  return removeAccent(option.children).includes(removeAccent(inputValue));
}

export default function AddMovie(props) {
  const { refetch, categories = [], directors = [], actors = [] } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // AntDesign FormInstance
  const [form] = Form.useForm();

  // Upload movie
  const [uploadMovie] = useRequest({
    onError: error => console.log('Upload movie error:', error),
    onResponse: response => {
      // Hide loading state of submit button
      setLoading(false);

      // Close modal
      setVisible(false);

      // Refetch movies
      refetch();
    },
  });

  // Upload image
  const [uploadImage] = useRequest({
    onError: error => console.log('Upload image error:', error),
    onResponse: response => {
      // Get image id from response
      const img = response.data;

      // Get other form values
      const {
        nameVn,
        nameEn,
        summary,
        releaseDate,
        categories,
        actors,
        directors,
      } = form.getFieldsValue();

      // Upload movie
      uploadMovie({
        api: 'movie',
        method: 'POST',
        data: {
          nameEn: nameEn,
          nameVn: nameVn,
          summary: summary,
          releaseDate: releaseDate.valueOf(),
          categories: categories,
          actors: actors,
          directors: directors,
          img: img,
        },
      });
    },
  });

  // Show modal on button click
  function showModal() {
    setVisible(true);
  }

  // Reset fields and hide modal when user cancels
  function handleCancel() {
    // Hide modal
    setVisible(false);

    // Reset all fields
    form.resetFields();
  }

  // Handle submit
  function handleOk() {
    // Validate fields
    form
      .validateFields()
      // If no errors => Proceed to upload image
      .then(values => {
        // Convert File to FormData
        let formData = new FormData();
        formData.append('file', values.img.file);

        // Upload image with FormData
        uploadImage({
          api: 'image',
          method: 'POST',
          data: formData,
        });

        // Set loading state for submit button
        setLoading(true);
      })
      // If there's error => Scroll to error
      .catch(info =>
        form.scrollToField(info.errorFields[0].name, {
          behavior: 'smooth',
        })
      );
  }

  // Cancel auto upload to manually upload on submit
  function beforeUpload(file) {
    return false;
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={plusCircle} text="Thêm phim" />

      <Modal
        visible={visible}
        title="Sửa phim"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nameVn"
            label="Tên Tiếng Việt"
            rules={[
              { required: true, message: 'Hãy nhập tên Tiếng Việt của phim' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="nameEn"
            label="Tên Tiếng Anh"
            rules={[
              { required: true, message: 'Hãy nhập tên Tiếng Anh của phim' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="releaseDate"
            label="Ngày ra mắt"
            rules={[
              { required: true, message: 'Hãy chọn ngày ra mắt của phim' },
            ]}
          >
            <DatePicker
              getPopupContainer={trigger => trigger.parentNode}
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            name="summary"
            label="Sơ lược phim"
            rules={[{ required: true, message: 'Hãy nhập sơ lược phim' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Thể loại phim"
            rules={[{ required: true, message: 'Hãy chọn ít nhất 1 thể loại' }]}
          >
            <Select
              getPopupContainer={trigger => trigger.parentNode}
              mode="multiple"
              filterOption={filterCategories}
            >
              {categories.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="actors"
            label="Diễn viên"
            rules={[
              { required: true, message: 'Hãy chọn ít nhất 1 diễn viên' },
            ]}
          >
            <Select
              getPopupContainer={trigger => trigger.parentNode}
              mode="multiple"
              filterOption={filterCategories}
            >
              {actors.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="directors"
            label="Đạo diễn"
            rules={[{ required: true, message: 'Hãy chọn ít nhất 1 đạo diễn' }]}
          >
            <Select
              getPopupContainer={trigger => trigger.parentNode}
              mode="multiple"
              filterOption={filterCategories}
            >
              {directors.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="img"
            label="Poster phim"
            rules={[
              {
                required: true,
                message: 'Hãy chọn poster cho phim',
              },
            ]}
          >
            <Upload
              beforeUpload={beforeUpload}
              listType="picture"
              accept="image/*"
              showUploadList={{
                showRemoveIcon: false,
              }}
            >
              <Button>
                <UploadOutlined /> Chọn file ảnh
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

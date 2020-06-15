import React, { useState, useEffect } from 'react';

import { IconButton } from 'Components/Shared/Buttons';
import { Modal, Form, Input, DatePicker, Select, Upload } from 'antd';
import removeAccent from 'Utils/helpers/removeAccent';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'Utils/request';

import plusCircle from '@iconify/icons-mdi/plus-circle';
import { useForceUpdate } from 'Utils/helpers/useForceUpdate';

const { Option } = Select;
const { TextArea } = Input;

function filterCategories(input, option) {
  return removeAccent(option.children).includes(removeAccent(input));
}

export default function AddMovie(props) {
  const { refetch, categories = [], directors = [], actors = [] } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // AntDesign FormInstance
  const [form] = Form.useForm();

  // Upload movie
  const [uploadMovie, { loading: uploadingMovie }] = useRequest({
    onError: error => console.log('Upload movie error:', error),
    onResponse: response => {
      // Close modal
      setVisible(false);

      // Refetch movies
      refetch();
    },
  });

  // Upload image
  const [uploadImage, { loading: uploadingImage }] = useRequest({
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

  // Preview Image after Selection
  const [previewURL, setPreviewURL] = useState();

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
  function handleSubmit() {
    // Validate fields
    form
      .validateFields()
      // If no errors => Proceed to upload image
      .then(values => {
        const [{ originFileObj: img }] = values.img;
        // Convert img File to FormData
        let formData = new FormData();
        // FormData must have a 'file' field that contains the img File
        formData.append('file', img);

        // Upload image to server with FormData
        uploadImage({
          api: 'image',
          method: 'POST',
          data: formData,
        });
      })
      // If there's error => Scroll to error
      .catch(info =>
        form.scrollToField(info.errorFields[0].name, {
          behavior: 'smooth',
        })
      );
  }

  // Check if chosen File is an image
  function checkImage(rule, fileList) {
    // Get origin File from FileList
    const file = fileList[0].originFileObj;

    // If selected File is an image
    if (file.type.startsWith('image/')) {
      // Create a FileReader
      const reader = new FileReader();

      // Read File to get base64
      reader.readAsDataURL(file);

      // After reading
      reader.addEventListener('load', () => {
        // Set base64 as preview URL
        setPreviewURL(reader.result);
      });

      // Validate OK
      return Promise.resolve();
    } else {
      // Reset preview URL
      setPreviewURL(undefined);

      // Show error
      return Promise.reject('Hãy chọn một file ảnh');
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={plusCircle} text="Thêm phim" />

      <Modal
        visible={visible}
        title="Thêm phim"
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={uploadingImage || uploadingMovie}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          {/* Vietnamese name of the movie */}
          <Form.Item
            name="nameVn"
            label="Tên Tiếng Việt"
            rules={[
              { required: true, message: 'Hãy nhập tên Tiếng Việt của phim' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* English name of the movie */}
          <Form.Item
            name="nameEn"
            label="Tên Tiếng Anh"
            rules={[
              { required: true, message: 'Hãy nhập tên Tiếng Anh của phim' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Release date of the movie */}
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

          {/* Summary of the movie */}
          <Form.Item
            name="summary"
            label="Sơ lược phim"
            rules={[{ required: true, message: 'Hãy nhập sơ lược phim' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Categories of the movie */}
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

          {/* Actors of the movie */}
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

          {/* Directors of the movie */}
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

          {/* Poster of the movie */}
          <Form.Item
            name="img"
            label="Poster phim"
            valuePropName="fileList" // Upload component uses 'fileList' property for value
            getValueFromEvent={event => event.fileList.slice(-1)} // Only get the latest file (at the end of the fileList array)
            rules={[
              {
                required: true,
                message: 'Hãy chọn poster cho phim',
              },
              { validator: checkImage },
            ]}
          >
            <Upload
              beforeUpload={() => false} // Cancel auto upload to manually upload on submit
              listType="picture-card"
              accept="image/*" // Only accept images
              showUploadList={false}
            >
              {previewURL ? (
                <img src={previewURL} alt="" />
              ) : (
                <div>
                  <UploadOutlined />
                  <div className="ant-upload-text">Chọn file ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

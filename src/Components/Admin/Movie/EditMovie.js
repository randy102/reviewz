import React, { useState } from 'react';

import { IconButton } from 'Components/Shared/Buttons';
import pencilIcon from '@iconify/icons-mdi/pencil';
import { Modal, Form, Input, DatePicker, Select, Upload } from 'antd';
import moment from 'moment';
import removeAccent from 'Utils/helpers/removeAccent';
import { useRequest } from 'Utils/request';

const { Option } = Select;
const { TextArea } = Input;

function filterCategories(inputValue, option) {
  return removeAccent(option.children).includes(removeAccent(inputValue));
}

export default function EditMovie(props) {
  const { data, categories = [], directors = [], actors = [], refetch } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Form controller
  const [form] = Form.useForm();

  // When all updates are done
  function onDone() {
    // Hide modal
    setVisible(false);
    // Refetch movies
    refetch();
  }

  // Update image
  const [updateImage, { loading: updatingImage }] = useRequest({
    onError: error => console.log('Update image error:', error),
    onResponse: response => onDone(), // End
  });

  // Update movie details
  const [updateDetails, { loading: updatingDetails }] = useRequest({
    onError: error => console.log('Update movie details error:', error),
    onResponse: response => {
      // Get first file from FileList from Form
      const [file] = form.getFieldValue('img');

      // Get File from FileList
      const img = file.originFileObj || file;

      // If user selected a new File
      if (img.uid !== -1) {
        // Convert File to FormData
        let formData = new FormData();
        formData.append('file', img);

        // Update image with FormData
        updateImage({
          api: `image/${data.img}`,
          method: 'PUT',
          data: formData,
        });
      } else onDone(); // else end
    },
  });

  // Preview image
  const [previewURL, setPreviewURL] = useState(
    `${process.env.REACT_APP_BACKEND}/image/${data.img}`
  );

  // Show modal
  function showModal() {
    setVisible(true);
  }

  // Handle cancel modal
  function handleCancel() {
    // Hide modal
    setVisible(false);

    // Reset fields
    form.resetFields();
  }

  // Handle submit
  function handleOk() {
    // Validate fields
    form
      .validateFields()
      // If no errors => Update image and details
      .then(values => {
        const {
          nameEn,
          nameVn,
          releaseDate,
          summary,
          categories,
          actors,
          directors,
        } = values;

        // Update details
        updateDetails({
          api: `movie/${data.id}`,
          method: 'PUT',
          data: {
            nameEn,
            nameVn,
            releaseDate: releaseDate.valueOf(),
            summary,
            img: data.img,
            categories,
            actors,
            directors,
          },
        });
      })
      // If there's error => Scroll to error for user to fix
      .catch(info =>
        form.scrollToField(info.errorFields[0].name, {
          behavior: 'smooth',
        })
      );
  }

  // Initial values for form
  const initialValues = {
    nameVn: data.nameVn,
    nameEn: data.nameEn,
    summary: data.summary,
    releaseDate: moment.utc(data.releaseDate),
    categories: data.categories,
    actors: data.actors || undefined,
    directors: data.directors || undefined,
    img: [
      {
        uid: -1,
        name: `${process.env.REACT_APP_BACKEND}/image/${data.img}`,
        status: 'done',
        url: `${process.env.REACT_APP_BACKEND}/image/${data.img}`,
      },
    ],
  };

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
      <IconButton onClick={showModal} icon={pencilIcon} />

      <Modal
        visible={visible}
        title="Sửa phim"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={updatingDetails || updatingImage}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={initialValues}>
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
            valuePropName="fileList" // Upload component uses 'fileList' for value, Form.Item will control Upload value with this prop name
            getValueFromEvent={event => event.fileList.slice(-1)} // Only get the latest file (at the end of the fileList array)
            rules={[{ validator: checkImage }]}
          >
            <Upload
              beforeUpload={() => false} // Cancel auto upload to manually upload on submit
              listType="picture-card"
              accept="image/*" // Only accept images
              showUploadList={false} // Disable upload list
            >
              <img src={previewURL} alt="" />
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

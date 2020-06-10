import React, { useState, useEffect } from 'react';

import { IconButton } from 'Components/Shared/Buttons';
import pencilIcon from '@iconify/icons-mdi/pencil';
import { Modal, Button, Form, Input, DatePicker, Select, Upload } from 'antd';
import moment from 'moment';
import removeAccent from 'Utils/helpers/removeAccent';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'Utils/request';

const { Option } = Select;
const { TextArea } = Input;

function filterCategories(inputValue, option) {
  return removeAccent(option.children).includes(removeAccent(inputValue));
}

export default function EditMovie(props) {
  const { data, context } = props;

  // Modal visible
  const [visible, setVisible] = useState(false);

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // AntDesign FormInstance
  const [form] = Form.useForm();

  // When updating is all done
  function onUpdateDone() {
    setVisible(false);
    context.refetch();
  }

  // Update image
  const [updateImage, { loading: updatingImage }] = useRequest({
    onError: error => {
      console.log('Update image error:', error);
    },
    onResponse: () => {
      // If details are already updated => Close modal and refetch
      // If not => Do nothing
      if (detailsUpdated) {
        onUpdateDone();
      }
    },
  });

  // Details is updated
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  // Update movie details
  const [updateDetails, { loading: updatingDetails }] = useRequest({
    onError: error => {
      console.log('Update movie details error:', error);
      setDetailsUpdated(true);
    },
    onResponse: () => {
      setDetailsUpdated(true);

      // If image is updating => Do nothing
      // If not => Close modal and refetch
      if (!updatingImage) {
        onUpdateDone();
      }
    },
  });

  // Show loading icon on submit button while updating image or details
  useEffect(() => {
    setLoading(updatingImage || updatingDetails);
  }, [updatingImage, updatingDetails]);

  // Show modal on EditMovie button click
  function showModal() {
    setVisible(true);
  }

  // Reset fields and hide modal when user cancels
  function handleCancel() {
    setVisible(false);
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

        // If user selected a new file
        if (fileList[0].uid !== -1) {
          // Convert File to FormData
          let formData = new FormData();
          formData.append('file', fileList[0]);

          // Update image with FormData
          updateImage({
            api: `image/${data.img}`,
            method: 'PUT',
            data: formData,
          });
        }

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
    img: data.img,
  };

  // Default img file from server
  const [fileList, setFileList] = useState([
    {
      uid: -1,
      name: `${process.env.REACT_APP_BACKEND}/image/${data.img}`,
      status: 'done',
      url: `${process.env.REACT_APP_BACKEND}/image/${data.img}`,
    },
  ]);

  // After selecting file
  function beforeUpload(file) {
    // Save selected file to fileList
    setFileList([file]);

    // Cancel auto upload so we can manually upload on submit
    return false;
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={pencilIcon} />

      <Modal
        visible={visible}
        title="Sửa phim"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" initialValues={initialValues}>
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
              {context.categories.map(({ id, name }) => (
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
              {context.actors.map(({ id, name }) => (
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
              {context.directors.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="img" label="Poster phim">
            <Upload
              beforeUpload={beforeUpload}
              listType="picture"
              accept="image/*"
              fileList={fileList}
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

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { Form, SubmitButton } from 'Components/Shared/Form/index';

import TextInput from 'Components/Shared/Form/TextInput';
import TextAreaInput from 'Components/Shared/Form/TextAreaInput';
import ImageInput from 'Components/Shared/Form/ImageInput';
import CategoryInput from 'Components/Shared/Form/CategoryInput';

import { IconButton } from 'Components/Shared/Buttons';
import { Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useRequest } from 'Utils/request';
import plusCircle from '@iconify/icons-mdi/plus-circle';
import movieIcon from '@iconify/icons-mdi/movie';
import calendarRange from '@iconify/icons-mdi/calendar-range';
import imageSizeSelectActual from '@iconify/icons-mdi/image-size-select-actual';
import textIcon from '@iconify/icons-mdi/text';
import tagIcon from '@iconify/icons-mdi/tag';

export default function AddMovie(props) {
  // Props destructuring
  const { refetch, categories } = props;

  // Show modal
  const [show, setShow] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // Form controller
  const {
    register: formRef,
    handleSubmit,
    errors,
    setError,
    clearError,
    getValues,
  } = useForm({
    validationSchema: yup.object().shape({
      nameVn: yup.string().required('Bắt buộc'),
      nameEn: yup.string().required('Bắt buộc'),
      summary: yup.string().required('Bắt buộc'),
      releaseDate: yup
        .string()
        .required('Bắt buộc')
        .test('wrongFormat', 'Sai định dạng DD/MM/YYYY', value => {
          let momentObj = moment.utc(value, 'DD/MM/YYYY', true);
          return momentObj.isValid();
        }),
      img: yup
        .mixed()
        .test('required', 'Bắt buộc', value => {
          return value.length > 0;
        })
        .test('notImage', 'Poster phim phải là một file ảnh', value => {
          return value.length > 0 && value[0].type.split('/')[0] === 'image';
        }),
      categories: yup.string().required('Bắt buộc'),
    }),
  });

  // On submit button
  function onSubmit(data) {
    // Only get img
    const { img } = data;

    // Set loading
    setLoading(true);

    // Upload image
    let formData = new FormData();
    formData.append('file', img[0]);
    uploadImage({
      api: 'image',
      method: 'POST',
      data: formData,
    });
  }

  // Upload movie poster
  const [uploadImage] = useRequest({
    onError: error => {
      // Log error
      console.log('Error uploading image:', error);

      // Finish loading
      setLoading(false);
    },
    onResponse: response => {
      // Get img id from response
      const imgId = response.data;

      // Get other input values from form
      const { nameVn, nameEn, summary, releaseDate, categories } = getValues();

      // Convert release date to Epoch time
      const dateEpoch = moment.utc(releaseDate, 'DD/MM/YYYY', true).valueOf();

      // Convert categories input to array
      const cateArray = categories.split(' ');

      // Send request to add movie
      addMovie({
        api: 'movie',
        method: 'POST',
        data: {
          nameVn: nameVn,
          nameEn: nameEn,
          summary: summary,
          releaseDate: dateEpoch,
          img: imgId,
          categories: cateArray,
        },
      });

      // Loading continues...
    },
  });

  // Add movie request
  const [addMovie] = useRequest({
    onError: error => {
      // Log error
      console.log('Add movie error:', error);

      // Finish loading
      setLoading(false);
    },
    onResponse: response => {
      // Finish loading
      setLoading(false);

      // Hide modal
      setShow(false);

      // Do stuff at parent level
      refetch();
    },
  });

  return (
    <div>
      <IconButton
        onClick={() => setShow(true)}
        icon={plusCircle}
        text="Thêm phim"
      />
      <Modal
        size="lg"
        centered
        show={show}
        onHide={() => setShow(false)}
        style={{ cursor: loading ? 'progress' : 'auto' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm phim</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          <Form style={{ margin: 0 }} onSubmit={handleSubmit(onSubmit)}>
            {/* Overlay to disable clicking while loading */}
            <div
              style={{
                height: '350px',
                width: '100%',
                position: 'absolute',
                background: 'rgb(255, 255, 255, 0.5)',
                display: loading ? 'block' : 'none',
                zIndex: '999',
                top: '1rem',
                left: 0,
              }}
            ></div>
            <div
              style={{
                display: 'grid',
                rowGap: '20px',
                width: '100%',
                height: '350px',
                overflow: 'auto',
                paddingRight: '1rem',
              }}
            >
              <TextInput
                icon={movieIcon}
                name="nameEn"
                ref={formRef}
                placeholder="Nhập tên phim Tiếng Anh"
                type="text"
                errors={errors}
              />

              <TextInput
                icon={movieIcon}
                name="nameVn"
                ref={formRef}
                placeholder="Nhập tên phim Tiếng Việt"
                type="text"
                errors={errors}
              />

              <TextInput
                icon={calendarRange}
                name="releaseDate"
                ref={formRef}
                placeholder="Nhập ngày ra mắt phim (dd/mm/yyyy)"
                type="text"
                errors={errors}
              />

              <TextAreaInput
                ref={formRef}
                name="summary"
                icon={textIcon}
                placeholder="Nhập tóm tắt sơ lược phim"
                rows={5}
                errors={errors}
              />

              <CategoryInput
                ref={formRef}
                name="categories"
                icon={tagIcon}
                placeholder="Chọn thể loại phim"
                errors={errors}
                clearError={clearError}
                categories={categories}
              />

              <ImageInput
                ref={formRef}
                name="img"
                icon={imageSizeSelectActual}
                placeholder="Chọn poster cho phim"
                errors={errors}
                setError={setError}
                clearError={clearError}
              />
            </div>
            <SubmitButton loading={loading} text="Lưu" />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

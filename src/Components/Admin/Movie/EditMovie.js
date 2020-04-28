import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useRequest } from 'Utils/request';

import moment from 'moment';
import * as yup from 'yup';

import { Modal } from 'react-bootstrap';
import { IconButton } from 'Components/Shared/Buttons';
import { Form, SubmitButton } from 'Components/Shared/Form/index';

import TextInput from 'Components/Shared/Form/TextInput';
import TextAreaInput from 'Components/Shared/Form/TextAreaInput';
import ImageInput from 'Components/Shared/Form/ImageInput';
import CategoryInput from 'Components/Shared/Form/CategoryInput';

import movieIcon from '@iconify/icons-mdi/movie';
import calendarRange from '@iconify/icons-mdi/calendar-range';
import imageSizeSelectActual from '@iconify/icons-mdi/image-size-select-actual';
import textIcon from '@iconify/icons-mdi/text';
import tagIcon from '@iconify/icons-mdi/tag';
import pencilIcon from '@iconify/icons-mdi/pencil';

export default function AddMovie(props) {
  // Props destructuring
  const { rowIndex, gridApi, data, refetch, categories } = props;

  // Show modal
  const [show, setShow] = useState(false);

  // Edit movie done
  const [movieDone, setMovieDone] = useState(false);

  // Edit image done
  const [imageDone, setImageDone] = useState(false);

  // When edit image and edit movie is done => Hide modal and redraw row
  useEffect(() => {
    if (movieDone && imageDone) {
      setShow(false);
      setMovieDone(false);
      setImageDone(false);
      let row = gridApi.getDisplayedRowAtIndex(rowIndex);
      gridApi.redrawRows({ rowNodes: [row] });
      refetch();
    }
  }, [movieDone, imageDone]);

  // Edit movie request
  const [updateMovie, { loading: updatingMovie }] = useRequest({
    onError: error => {
      console.log('Update movie error:', error);
      setMovieDone(true);
    },
    onResponse: response => {
      setMovieDone(true);
    },
  });

  // Edit image request
  const [updateImage, { loading: updatingImage }] = useRequest({
    onError: error => {
      console.log('Update image error:', error);
      setImageDone(true);
    },
    onResponse: response => {
      setImageDone(true);
    },
  });

  // Form controller
  const { register: formRef, handleSubmit, errors, clearError } = useForm({
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
        .test('notImage', 'Poster phim phải là một file ảnh', value => {
          // If there is no file => Keep old poster
          if (value.length === 0) return true;

          // If there is file => Check if file type is image
          return value[0].type.split('/')[0] === 'image';
        }),
      categories: yup.string().required('Bắt buộc'),
    }),
  });

  // On submit
  function onSubmit(input) {
    const { nameEn, nameVn, releaseDate, summary, categories, img } = input;

    // Convert release date to Epoch time
    const dateEpoch = moment.utc(releaseDate, 'DD/MM/YYYY', true).valueOf();

    // Convert categories input to array
    const cateArray = categories.split(' ');

    updateMovie({
      api: `movie/${data.id}`,
      method: 'PUT',
      data: {
        nameEn: nameEn,
        nameVn: nameVn,
        releaseDate: dateEpoch,
        summary: summary,
        categories: cateArray,
        img: data.img,
      },
    });

    if (img.length !== 0) {
      let formData = new FormData();
      formData.append('file', img[0]);
      updateImage({
        api: `image/${data.img}`,
        method: 'PUT',
        data: formData,
      });
    } else {
      setImageDone(true);
    }
  }

  return (
    <>
      <IconButton onClick={() => setShow(true)} icon={pencilIcon} />

      <Modal
        size="lg"
        centered
        show={show}
        onHide={() => setShow(false)}
        style={{ cursor: updatingMovie || updatingImage ? 'progress' : 'auto' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa phim</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            pointerEvents: updatingMovie || updatingImage ? 'none' : 'auto',
          }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Overlay to disable clicking while loading */}
            <div
              style={{
                height: '350px',
                width: '100%',
                position: 'absolute',
                background: 'rgb(255, 255, 255, 0.5)',
                display: updatingMovie || updatingImage ? 'block' : 'none',
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
                name="nameVn"
                ref={formRef}
                placeholder="Nhập tên phim Tiếng Việt"
                defaultValue={data.nameVn}
                type="text"
                errors={errors}
              />

              <TextInput
                icon={movieIcon}
                name="nameEn"
                ref={formRef}
                placeholder="Nhập tên phim Tiếng Anh"
                defaultValue={data.nameEn}
                type="text"
                errors={errors}
              />

              <TextInput
                icon={calendarRange}
                name="releaseDate"
                ref={formRef}
                placeholder="Nhập ngày ra mắt phim (dd/mm/yyyy)"
                defaultValue={moment(data.releaseDate).format('DD/MM/YYYY')}
                type="text"
                errors={errors}
              />

              <TextAreaInput
                ref={formRef}
                name="summary"
                icon={textIcon}
                placeholder="Nhập tóm tắt sơ lược phim"
                defaultValue={data.summary}
                rows={5}
                errors={errors}
              />

              <CategoryInput
                ref={formRef}
                name="categories"
                icon={tagIcon}
                errors={errors}
                clearError={clearError}
                defaultValue={data.categories.join(' ')}
                categories={categories}
              />

              <ImageInput
                ref={formRef}
                name="img"
                icon={imageSizeSelectActual}
                placeholder="Chọn poster cho phim"
                errors={errors}
                defaultSrc={data.img}
              />
            </div>
            <SubmitButton loading={updatingMovie || updatingImage} text="Lưu" />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';
import { Modal } from 'react-bootstrap';
import TextInput from 'Components/Shared/Form/TextInput';
import Loading from 'Components/Shared/Loading';
import * as yup from 'yup';

import pencilIcon from '@iconify/icons-mdi/pencil';
import tagIcon from '@iconify/icons-mdi/tag';

import formStyles from 'SCSS/Form.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().required('Hãy nhập tên đạo diễn mới'),
});

export default function EditCategory(props) {
  // Props destructuring
  const { data, refetch } = props;

  // Styles destructuring
  const { grid } = formStyles;

  // Edit request
  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Director existed':
          setError('name', 'nameExisted', 'Đạo diễn này đã tồn tại');
          break;
        default:
          console.log('Edit director error:', error);
      }
    },
    onResponse: () => {
      setShow(false);
      refetch();
    },
  });

  // Show modal
  const [show, setShow] = useState(false);

  // Form controller
  const {
    register: formRef,
    handleSubmit,
    errors,
    setError,
    clearError,
  } = useForm({
    validationSchema: validationSchema,
  });

  function onSubmit({ name }) {
    clearError();
    sendRequest({
      api: `director/${data.id}`,
      method: 'PUT',
      data: {
        name: name,
      },
    });
  }

  return (
    <>
      <IconButton onClick={() => setShow(true)} icon={pencilIcon} />

      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa đạo diễn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={grid}
            style={{
              margin: 0,
            }}
          >
            <span>
              Tên đạo diễn hiện tại: <strong>{data.name}</strong>
            </span>
            <TextInput
              icon={tagIcon}
              name="name"
              ref={formRef}
              placeholder="Nhập tên đạo diễn mới"
              type="text"
              errors={errors}
            />

            <button type="submit">{loading ? <Loading /> : 'Lưu'}</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

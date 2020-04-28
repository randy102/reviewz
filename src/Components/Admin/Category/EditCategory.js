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

export default function EditCategory(props) {
  // Props destructuring
  const { data, refetch } = props;

  // Styles destructuring
  const { grid, loading_icon } = formStyles;

  // Edit request
  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      switch (error.message) {
        case 'Category existed':
          setError('name', 'categoryExisted', 'Thể loại này đã tồn tại');
          break;
        default:
          console.log('Edit category error:', error);
      }
    },
    onResponse: response => {
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
    validationSchema: yup.object().shape({
      name: yup.string().required('Hãy nhập tên thể loại mới'),
    }),
  });

  function onSubmit({ name }) {
    clearError();
    sendRequest({
      api: `category/${data.id}`,
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
          <Modal.Title>Sửa thể loại</Modal.Title>
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
              Tên thể loại hiện tại: <strong>{data.name}</strong>
            </span>
            <TextInput
              icon={tagIcon}
              name="name"
              ref={formRef}
              placeholder="Nhập tên thể loại mới"
              type="text"
              errors={errors}
            />

            <button type="submit">
              {loading ? <Loading className={loading_icon} /> : 'Lưu'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

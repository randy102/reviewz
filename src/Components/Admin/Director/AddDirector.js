import React, { useState } from 'react';

import { useRequest } from 'Utils/request/index';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';

import { Modal } from 'react-bootstrap';
import TextInput from 'Components/Shared/Form/TextInput';
import Loading from 'Components/Shared/Loading';
import { IconButton } from 'Components/Shared/Buttons';

import tagIcon from '@iconify/icons-mdi/tag';
import plusCircle from '@iconify/icons-mdi/plus-circle';

import formStyles from 'SCSS/Form.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().required('Hãy nhập tên đạo diễn'),
});

export default function AddCategory(props) {
  // Props
  const { refetch } = props;

  // Show modal
  const [show, setShow] = useState(false);

  // Request
  const [sendRequest, { loading }] = useRequest({
    onResponse: response => {
      setShow(false);
      refetch();
    },
    onError: error => {
      console.log('error:', error);
      switch (error.message) {
        case 'Director existed':
          setError('name', 'nameExisted', 'Đạo diễn này đã tồn tại');
          break;
        default:
          console.log('Create director error:', error);
      }
    },
  });

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

  // On submit
  function onSubmit({ name }) {
    clearError();
    sendRequest({
      api: 'director',
      method: 'POST',
      data: {
        name: name,
      },
    });
  }

  // Classnames
  const { grid } = formStyles;

  return (
    <>
      <IconButton
        onClick={() => setShow(true)}
        icon={plusCircle}
        text="Thêm đạo diễn"
      />

      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm đạo diễn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={grid}
            style={{
              margin: 0,
            }}
          >
            <TextInput
              icon={tagIcon}
              name="name"
              ref={formRef}
              placeholder="Nhập tên đạo diễn"
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

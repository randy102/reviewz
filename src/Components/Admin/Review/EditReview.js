import React, { useState } from 'react';
import { IconButton, SubmitButton } from 'Components/Shared/Buttons';

import { Modal } from 'react-bootstrap';

import pencilIcon from '@iconify/icons-mdi/pencil';
import { useRequest } from 'Utils/request';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextAreaInput from 'Components/Shared/Form/TextAreaInput';

import commentTextOutline from '@iconify/icons-mdi/comment-text-outline';
import StarsInput from 'Components/Shared/Form/StarsInput';
import { Form } from 'Components/Shared/Form';

export default function EditReview({ params }) {
  // Props destructuring
  const {
    data: { id, star, content },
    context: { refetch },
  } = params;

  // // Show modal
  const [show, setShow] = useState(false);

  // Edit request
  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      console.log('Edit review error:', error);
    },
    onResponse: response => {
      setShow(false);
      refetch();
    },
  });

  // // On submit
  function onSubmit({ content, star }) {
    sendRequest({
      api: `review/${id}`,
      method: 'PUT',
      data: {
        content,
        star,
      },
    });
  }

  // Form controller
  const { register: formRef, handleSubmit, errors } = useForm({
    validationSchema: yup.object().shape({
      content: yup.string().required('Bắt buộc'),
      star: yup.number().required('Bắt buộc'),
    }),
  });

  return (
    <React.Fragment>
      <IconButton onClick={() => setShow(true)} icon={pencilIcon} />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextAreaInput
              ref={formRef}
              name="content"
              icon={commentTextOutline}
              placeholder="Nhập review"
              defaultValue={content}
              rows={5}
              errors={errors}
            />
            <StarsInput
              ref={formRef}
              name="star"
              defaultValue={star}
              errors={errors}
            />
            <SubmitButton loading={loading} text="Lưu" />
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

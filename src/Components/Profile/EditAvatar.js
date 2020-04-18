import React, { useState, useRef } from 'react';

import { Modal } from 'react-bootstrap';

import { transparent_backdrop } from 'SCSS/Profile.module.scss';

import useUploadImage from 'Utils/request/useUploadImage';

import { useEditRequest } from 'Utils/request/useEditRequest';

import { SubmitButton } from 'Components/Shared/Buttons';

import { Icon } from '@iconify/react';

import { setToken } from 'Utils/auth';

import cameraIcon from '@iconify/icons-mdi/camera';

export default function EditAvatar(props) {
  // Props destructuring
  const { show, onHide } = props;

  // Edit request
  const { sendEditRequest, loading: editLoading } = useEditRequest({
    onError: error => {
      console.log('Edit avatar error:', error);
    },
    onResponse: response => {
      setToken(response.data);
      onHide();
    },
  });

  // Upload image request
  const { uploadImage, loading: uploadLoading, refetch } = useUploadImage({
    onResponse: response => {
      console.log('Upload image response:', response);
      sendEditRequest({
        img: response.data,
      });
    },
    onError: error => {
      console.log('Upload image error:', error);
    },
  });

  // File select ref
  const inputRef = useRef();

  // Selected file
  const [selectedFile, selectFile] = useState(null);

  // Handle file change
  const handleChange = event => {
    selectFile(event.target.files[0]);
  };

  // Handle upload click
  const handleUpload = () => {
    let formData = new FormData();
    formData.append('file', selectedFile);
    uploadImage(formData);
  };

  return (
    <Modal
      backdropClassName={transparent_backdrop}
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Đổi ảnh đại diện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={handleChange}
          ref={inputRef}
        />
        <div>
          <Icon icon={cameraIcon} />
          <button onClick={() => inputRef.current.click()}>
            Chọn file ảnh
          </button>
        </div>

        <SubmitButton
          style={{ marginTop: '1rem' }}
          onClick={handleUpload}
          loading={uploadLoading || editLoading}
          text="Lưu"
        />
      </Modal.Body>
    </Modal>
  );
}

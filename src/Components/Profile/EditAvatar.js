import React, { useState, useRef } from 'react';
import { useRequest } from 'Utils/request/';
import { setToken, getCurrentUser } from 'Utils/auth';

import { Modal } from 'react-bootstrap';
import { SubmitButton, IconButton } from 'Components/Shared/Buttons';
import Avatar from 'Components/Shared/Avatar';

import cameraIcon from '@iconify/icons-mdi/camera';

import { transparent_backdrop } from 'SCSS/Profile.module.scss';

export default function EditAvatar(props) {
  // Props destructuring
  const { show, onHide } = props;

  // Current image src
  const [src, setSrc] = useState(undefined);

  // Edit request
  const [requestEdit, editting] = useRequest({
    onResponse: response => {
      setToken(response.data);
      onHide();
    },
    onError: error => {
      console.log('Edit avatar error:', error);
    },
  });

  // Upload image
  const [uploadImage, uploading] = useRequest({
    onResponse: response => {
      console.log('Upload image response:', response);
      requestEdit({
        api: `user/${getCurrentUser().id}`,
        method: 'PUT',
        data: {
          img: response.data,
        },
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
    let reader = new FileReader();

    reader.onload = e => {
      setSrc(e.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  // Handle upload click
  const handleUpload = () => {
    let formData = new FormData();
    formData.append('file', selectedFile);
    uploadImage({
      api: 'image',
      method: 'POST',
      data: formData,
    });
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
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            gap: '1rem',
          }}
        >
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={handleChange}
            ref={inputRef}
          />
          <IconButton
            icon={cameraIcon}
            onClick={() => inputRef.current.click()}
            text="Chọn file ảnh"
          />
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '999px',
              overflow: 'hidden',
              background: 'white',
            }}
          >
            {src ? (
              <img
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                src={src}
                alt=""
              />
            ) : (
              <Avatar />
            )}
          </div>

          <SubmitButton
            onClick={handleUpload}
            loading={uploading || editting}
            text="Lưu"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

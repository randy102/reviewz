import React, { useState, useRef } from 'react';
import { useRequest } from 'Utils/request/';
import { getCurrentUser, setToken, getToken } from 'Utils/auth';

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

  const currentUser = getCurrentUser();

  // Update image
  const [update, { loading: updating }] = useRequest({
    // After updating => Set new token and hide modal
    onResponse: response => {
      if (!currentUser.img) {
        setToken(response.data);
      } else {
      }
      onHide();
    },
    onError: error => {
      console.log('Update image error:', error);
      onHide();
    },
  });

  // Upload image
  const [upload, { loading: uploading }] = useRequest({
    // After uploading => Set img id to current account
    onResponse: response => {
      update({
        api: `user/${currentUser.id}`,
        method: 'PUT',
        data: {
          img: response.data,
        },
      });
    },
    onError: error => {
      console.log('Upload image error:', error);
      onHide();
    },
  });

  // File select ref
  const inputRef = useRef();

  // Selected file
  const [selectedFile, selectFile] = useState(null);

  // Handle file change
  const handleChange = event => {
    if (event.target.files.length === 0) {
      return;
    }

    selectFile(event.target.files[0]);
    let reader = new FileReader();

    reader.onload = e => {
      setSrc(e.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  // Handle upload click
  function handleClick() {
    let formData = new FormData();
    formData.append('file', selectedFile);

    // If current account already has an image id => Keep id, update image data
    if (currentUser.img) {
      update({
        api: `image/${currentUser.img}`,
        method: 'PUT',
        data: formData,
      });
    }

    // If current account doesn't have an image id => Upload new image
    else {
      upload({
        api: 'image',
        method: 'POST',
        data: formData,
      });
    }
  }

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
            onClick={handleClick}
            loading={uploading || updating}
            text="Lưu"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

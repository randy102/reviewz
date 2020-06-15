import React from 'react';
import { Button, Upload, message } from 'antd';
import { useRef } from 'react';
import { useRequest } from 'Utils/request';
import { setToken, getCurrentUser } from 'Utils/auth';

export default function ({ updateParent }) {
  const inputRef = useRef();

  // Update image
  const [updateImage, { loading: updatingImage }] = useRequest({
    onError: error => console.log('Update image error:', error),
    onResponse: response => {
      // Update Parent drawer
      updateParent();
    },
  });

  // Call API to update user
  const [updateUser, { loading: updatingUser }] = useRequest({
    onError: error => console.log('Update user error:', error),
    onResponse: response => {
      // Update user token
      setToken(response.data);

      // Update Parent drawer
      updateParent();
    },
  });

  // Upload new image if this user doesn't have image id
  const [uploadImage, { loading: uploadingImage }] = useRequest({
    onError: error => console.log('Upload image error:', error),
    onResponse: response => {
      // Update user with new image id
      updateUser({
        api: `user/${getCurrentUser().id}`,
        method: 'PUT',
        data: {
          img: response.data,
        },
      });
    },
  });

  // On button click
  function handleClick() {
    // Choose file
    inputRef.current.click();
  }

  // On file change
  function handleChange() {
    // Get File from FileList
    const [file] = inputRef.current.files;

    // If selected File is not an image
    if (!file.type.startsWith('image')) {
      // Show error message
      message.error('Ảnh đại diện phải là một file ảnh!');

      // Stop function
      return;
    }

    // Create FormData
    let formData = new FormData();

    // Add File to FormData
    formData.append('file', file);

    // This user image id
    const { img } = getCurrentUser();

    // If this user doesn't have an image id
    if (img === '') {
      // Upload new image with FormData
      uploadImage({
        api: 'image',
        method: 'POST',
        data: formData,
      });
    }
    // If this user already has an image id
    else {
      // Update that image
      updateImage({
        api: `image/${img}`,
        method: 'PUT',
        data: formData,
      });
    }
  }

  return (
    <React.Fragment>
      <Button
        loading={uploadingImage || updatingUser || updatingImage}
        onClick={handleClick}
        block
      >
        Đổi ảnh đại diện
        <input
          onChange={handleChange}
          accept="image/*"
          ref={inputRef}
          hidden
          type="file"
        />
      </Button>
    </React.Fragment>
  );
}

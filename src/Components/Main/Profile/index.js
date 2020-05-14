import React, { useState } from 'react';

import { getCurrentUser } from 'Utils/auth';

import { Icon } from '@iconify/react';
import { Modal } from 'react-bootstrap';
import Avatar from 'Components/Shared/Avatar';

import cameraRetake from '@iconify/icons-mdi/camera-retake';
import pencilIcon from '@iconify/icons-mdi/pencil';
import lockReset from '@iconify/icons-mdi/lock-reset';

import profileStyles from 'SCSS/Profile.module.scss';

import EditUsername from './EditUsername';
import EditPassword from './EditPassword';
import EditAvatar from './EditAvatar';
import ConfirmPassword from './ConfirmPassword';

export default function EditProfile(props) {
  // Props
  const { show, onHide } = props;

  // Show main modal
  const [showMain, setMain] = useState(true);

  // Password is confirmed
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  // Edit username
  const [showEditUsername, setEditUsername] = useState(false);
  function toggleEditUsername() {
    setMain(!showMain);
    setEditUsername(!showEditUsername);
  }

  // Edit password
  const [showEditPassword, setEditPassword] = useState(false);
  function toggleEditPassword() {
    setMain(!showMain);
    setEditPassword(!showEditPassword);
  }

  // Edit avatar
  const [showEditAvatar, setEditAvatar] = useState(false);
  function toggleEditAvatar() {
    setMain(!showMain);
    setEditAvatar(!showEditAvatar);
  }

  // Classnames
  const {
    container,
    leftside,
    avatar,
    username,
    rightside,
    buttons_container,
    button,
  } = profileStyles;

  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={onHide}
        style={(!showMain && { opacity: 0 }, { color: 'black' })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={container}>
            <div className={leftside}>
              <div className={avatar}>
                <Avatar />
              </div>
              <div className={username}>
                <span>{getCurrentUser().name}</span>
              </div>
            </div>
            <div className={rightside}>
              {passwordConfirmed ? (
                <div className={buttons_container}>
                  <div onClick={toggleEditUsername} className={button}>
                    <Icon icon={pencilIcon} />
                    <span>Đổi tên đăng nhập</span>
                  </div>
                  <div onClick={toggleEditAvatar} className={button}>
                    <Icon icon={cameraRetake} />
                    <span>Đổi ảnh đại diện</span>
                  </div>
                  <div onClick={toggleEditPassword} className={button}>
                    <Icon icon={lockReset} />
                    <span>Đổi mật khẩu</span>
                  </div>
                </div>
              ) : (
                <ConfirmPassword
                  onResponse={() => setPasswordConfirmed(true)}
                />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditUsername show={showEditUsername} onHide={toggleEditUsername} />

      <EditPassword show={showEditPassword} onHide={toggleEditPassword} />

      <EditAvatar show={showEditAvatar} onHide={toggleEditAvatar} />
    </React.Fragment>
  );
}

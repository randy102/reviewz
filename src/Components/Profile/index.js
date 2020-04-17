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

export default function EditProfile(props) {
  // Props
  const { show, onHide } = props;

  const [showMain, setMain] = useState(true);

  // Edit username
  const [showEditUsername, setEditUsername] = useState(false);
  function toggleEditUsername() {
    setMain(!showMain);
    setEditUsername(!showEditUsername);
  }

  // Edit password
  const [showEditPassword, setEditPassword] = useState(false);
  function toggleEditPassword() {
    setEditPassword(!showEditPassword);
  }

  // Edit avatar
  const [showEditAvatar, setEditAvatar] = useState(false);
  function toggleEditAvatar() {
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
    no_backdrop,
  } = profileStyles;

  return (
    <>
      <Modal centered show={show} onHide={onHide}>
        {showMain && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Thông tin cá nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={container}>
                <div className={leftside}>
                  <div className={avatar}>
                    {/* <Avatar /> */}
                    <img
                      src="https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png"
                      alt=""
                    />
                  </div>
                  <div className={username}>
                    <span>{getCurrentUser().name}</span>
                  </div>
                </div>
                <div className={rightside}>
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
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      <EditUsername show={showEditUsername} onHide={toggleEditUsername} />
    </>
  );
}

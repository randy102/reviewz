import React from 'react';
import { Drawer, Button, Space, Divider } from 'antd';
import { getCurrentUser } from 'Utils/auth';
import Avatar from 'Components/Shared/Avatar';
import { css } from 'emotion';
import ChangeUsername from './ChangeUsername';
import { useForceUpdate } from 'Utils/helpers/useForceUpdate';
import ChangeAvatar from './ChangeAvatar';
import ChangePassword from './ChangePassword';

const styles = {
  avatarContainer: css`
    width: 100%;
    padding-top: 100%;
    position: relative;
  `,
  avatar: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  username: css`
    text-align: center;
    font-size: 20px;
  `,
};

export default function (props) {
  const { visible, setVisible } = props;

  // Hide drawer
  function hideDrawer() {
    setVisible(false);
  }

  // Force update (username and image)
  const forceUpdate = useForceUpdate();

  const spaceProps = {
    style: {
      width: '100%',
    },
    direction: 'vertical',
  };

  return (
    <Drawer title="Thông tin cá nhân" onClose={hideDrawer} visible={visible}>
      {/* Avatar and username */}
      <Space size="small" {...spaceProps}>
        <div className={styles.avatarContainer}>
          <Avatar
            className={styles.avatar}
            id={
              getCurrentUser().img &&
              `${getCurrentUser().img}?${new Date().getTime()}`
            }
          />
        </div>
        <div className={styles.username}>{getCurrentUser().name}</div>
      </Space>

      {/* Horizontal divider */}
      <Divider />

      {/* Buttons */}
      <Space size="middle" {...spaceProps}>
        <ChangeUsername updateParent={forceUpdate} />
        <ChangeAvatar updateParent={forceUpdate} />
        <ChangePassword />
      </Space>
    </Drawer>
  );
}

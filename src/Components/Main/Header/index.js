import React, { useState } from 'react';

import SearchBar from './SearchBar';
import Brand from './Brand';
import Genres from './Genres';
import UserDropdown from './UserDropdown';
import { OutlinedButton } from 'Components/Shared/Buttons';
import { useHistory } from 'react-router-dom';

import { loggedIn } from 'Utils/auth';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';
import RegisterForm from './RegisterForm';
import { Modal, Tabs } from 'antd';
import LoginForm from './LoginForm';

const { TabPane } = Tabs;

const styles = {
  header: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  `,
  topContainer: css`
    width: 100%;
    background: ${colors.primary};
  `,
  topContent: css`
    display: flex;
    max-width: 1174px;
    margin: 0 auto;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
  `,
  buttons: css`
    display: flex;
  `,
};

export default function Header() {
  // Modal visible
  const [visible, setVisible] = useState(false);

  // Modal tabs active key
  const [activeKey, setActiveKey] = useState('register');

  // Show modal
  function showModal() {
    setVisible(true);
  }

  // Hide modal
  function hideModal() {
    setVisible(false);
  }

  // On Register button click
  function handleRegisterClick() {
    setActiveKey('register');
    showModal();
  }

  // On Login button click
  function handleLoginClick() {
    setActiveKey('login');
    showModal();
  }

  // On Tab change
  function handleTabChange(activeKey) {
    setActiveKey(activeKey);
  }

  return (
    <div className={styles.header}>
      <div className={styles.topContainer}>
        <div className={styles.topContent}>
          <Brand />
          <SearchBar />

          <div className={styles.buttons}>
            {loggedIn() ? (
              <UserDropdown />
            ) : (
              <React.Fragment>
                {/* Register button */}
                <OutlinedButton onClick={handleRegisterClick} text="Đăng ký" />

                {/* Login button */}
                <OutlinedButton onClick={handleLoginClick} text="Đăng nhập" />

                <Modal visible={visible} onCancel={hideModal} footer={null}>
                  <Tabs activeKey={activeKey} onChange={handleTabChange}>
                    {/* Register tab */}
                    <TabPane tab="Đăng ký" key="register">
                      <RegisterForm switchTab={setActiveKey} />
                    </TabPane>

                    {/* Login tab */}
                    <TabPane tab="Đăng nhập" key="login">
                      <LoginForm />
                    </TabPane>
                  </Tabs>
                </Modal>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <Genres />
    </div>
  );
}

import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Tabs } from 'antd';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const { TabPane } = Tabs;

const LoginRegisterModal = ({
  visible = false,
  onTabChange = () => null,
  onCancel = () => null,
  activeKey = 'login',
  setActiveKey = () => null,
}) => (
  <Modal visible={visible} onCancel={onCancel} footer={null}>
    <Tabs activeKey={activeKey} onChange={onTabChange}>
      {/* Register tab */}
      <TabPane tab="Đăng ký" key="register">
        <RegisterForm switchTab={setActiveKey} />
      </TabPane>

      {/* Login tab */}
      <TabPane tab="Đăng nhập" key="login">
        <LoginForm switchTab={setActiveKey} />
      </TabPane>
    </Tabs>
  </Modal>
);

export default LoginRegisterModal;

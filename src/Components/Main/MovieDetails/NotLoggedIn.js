import React, { useState } from 'react';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import LoginRegisterModal from '../Header/LoginRegisterModal';

const NotLoggedIn = ({ formLayout }) => {
  // Modal visible
  const [visible, setVisible] = useState(false);

  // Modal tabs active key
  const [activeKey, setActiveKey] = useState('login');

  // Show modal
  function showModal() {
    setVisible(true);
  }

  // Hide modal
  function hideModal() {
    setVisible(false);
  }

  // On Tab change
  function handleTabChange(activeKey) {
    setActiveKey(activeKey);
  }

  // On Login Link click
  function handleLogin() {
    showModal();
    setActiveKey('login');
  }

  // On Register Link click
  function handleRegister() {
    showModal();
    setActiveKey('register');
  }

  return (
    <Form {...formLayout}>
      <Form.Item>
        <h1>Đánh giá của bạn</h1>
      </Form.Item>

      <Form.Item>
        <Link onClick={handleLogin}>Đăng nhập</Link> để viết đánh giá.
      </Form.Item>

      <Form.Item>
        Chưa có tài khoản? <Link onClick={handleRegister}>Đăng ký ngay.</Link>
      </Form.Item>

      {/* Modal for Login Form and Register Form */}
      <LoginRegisterModal
        visible={visible}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        onCancel={hideModal}
        onTabChange={handleTabChange}
      />
    </Form>
  );
};

export default NotLoggedIn;

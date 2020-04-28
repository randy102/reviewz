import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'Utils/auth';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu } from 'antd';

import 'SCSS/Admin/Header.scss';

const { Header } = Layout;

const headerMenu = (
  <Menu id="header-menu">
    <Menu.Item key="0">
      <Link to="/user/profile">
        <InfoCircleOutlined />
        Chỉnh sửa thông tin
      </Link>
    </Menu.Item>

    <Menu.Item key="2">
      <Link to="/">
        <HomeOutlined />
        Về trang chủ
      </Link>
    </Menu.Item>

    <Menu.Item key="1">
      <Link to="/logout">
        <LogoutOutlined />
        Đăng xuất
      </Link>
    </Menu.Item>
  </Menu>
);

export default function MyHeader({ toggle, collapsed }) {
  const currentUser = getCurrentUser();

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}

      <Dropdown.Button id="header-btn" overlay={headerMenu}>
        <UserOutlined />
        {currentUser.name}
      </Dropdown.Button>
    </Header>
  );
}

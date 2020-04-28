import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { css } from 'emotion';

import { Icon } from '@iconify/react';
import movieOutline from '@iconify/icons-mdi/movie-outline';
import accountOutline from '@iconify/icons-mdi/account-outline';
import tagOutline from '@iconify/icons-mdi/tag-outline';
import commentTextOutline from '@iconify/icons-mdi/comment-text-outline';

import 'antd/dist/antd.css';
import 'SCSS/Admin/Sider.scss';

const { Sider } = Layout;

export default function MySider({ collapsed }) {
  const location = useLocation();

  const selectedKey =
    location.pathname === '/admin' || location.pathname === '/admin/'
      ? '/admin/user'
      : location.pathname;

  const iconClass = css`
    margin-right: 10px;
    font-size: 20px;
  `;

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="brand">CONTROL PANEL</div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={['/admin/user']}
      >
        <Menu.Item key="/admin/user">
          <Link to="/admin/user">
            <Icon className={iconClass} icon={accountOutline} />
            <span>Người dùng</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/category">
          <Link to="/admin/category">
            <Icon className={iconClass} icon={tagOutline} />
            <span>Thể loại</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/movie">
          <Link to="/admin/movie">
            <Icon className={iconClass} icon={movieOutline} />
            <span>Phim</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/review">
          <Link to="/admin/review">
            <Icon className={iconClass} icon={commentTextOutline} />
            <span>Review</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

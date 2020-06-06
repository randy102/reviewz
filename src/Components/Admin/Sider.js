import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { css } from 'emotion';

import movieOutline from '@iconify/icons-mdi/movie-outline';
import accountOutline from '@iconify/icons-mdi/account-outline';
import tagOutline from '@iconify/icons-mdi/tag-outline';
import commentTextOutline from '@iconify/icons-mdi/comment-text-outline';
import commentPlusOutline from '@iconify/icons-mdi/comment-plus-outline';
import chartLine from '@iconify/icons-mdi/chart-line';
import accountTieVoiceOutline from '@iconify/icons-mdi/account-tie-voice-outline';
import kabaddiIcon from '@iconify/icons-mdi/kabaddi';

import AntIcon from '@ant-design/icons';
import { Icon as Iconify } from '@iconify/react';

import 'antd/dist/antd.css';
import 'SCSS/Admin/Sider.scss';

const { Sider } = Layout;

const iconStyle = css`
  font-size: 20px;
`;

export default function MySider({ collapsed }) {
  const location = useLocation();

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Link to="/" className="brand">
        {collapsed ? 'R' : 'Reviewz'}
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={['/admin/dashboard']}
      >
        <Menu.Item key="/admin/dashboard">
          <Link to="/admin/dashboard">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={chartLine} />
              )}
            />
            <span>Thống kê</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/user">
          <Link to="/admin/user">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={accountOutline} />
              )}
            />
            <span>Người dùng</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/category">
          <Link to="/admin/category">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={tagOutline} />
              )}
            />
            <span>Thể loại</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/movie">
          <Link to="/admin/movie">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={movieOutline} />
              )}
            />
            <span>Phim</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/review">
          <Link to="/admin/review">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={commentTextOutline} />
              )}
            />
            <span>Review</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/director">
          <Link to="/admin/director">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={accountTieVoiceOutline} />
              )}
            />
            <span>Đạo diễn</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/actor">
          <Link to="/admin/actor">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={kabaddiIcon} />
              )}
            />
            <span>Diễn viên</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/request">
          <Link to="/admin/request">
            <AntIcon
              component={() => (
                <Iconify className={iconStyle} icon={commentPlusOutline} />
              )}
            />
            <span>Yêu cầu</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

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

import 'SCSS/Admin/Sider.scss';

const { Sider } = Layout;

const iconStyle = css`
  font-size: 20px;
`;

const textStyle = css`
  font-size: 16px;
  font-family: Roboto;
`;

function MenuLink(props) {
  const { to, icon, text } = props;

  return (
    <Link to={to}>
      <AntIcon
        component={() => <Iconify className={iconStyle} icon={icon} />}
      />
      <span className={textStyle}>{text}</span>
    </Link>
  );
}

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
          <MenuLink to="/admin/dashboard" icon={chartLine} text="Thống kê" />
        </Menu.Item>

        <Menu.Item key="/admin/user">
          <MenuLink to="/admin/user" icon={accountOutline} text="Người dùng" />
        </Menu.Item>

        <Menu.Item key="/admin/category">
          <MenuLink to="/admin/category" icon={tagOutline} text="Thể loại" />
        </Menu.Item>

        <Menu.Item key="/admin/movie">
          <MenuLink to="/admin/movie" icon={movieOutline} text="Phim" />
        </Menu.Item>

        <Menu.Item key="/admin/review">
          <MenuLink
            to="/admin/review"
            icon={commentTextOutline}
            text="Review"
          />
        </Menu.Item>

        <Menu.Item key="/admin/director">
          <MenuLink
            to="/admin/director"
            icon={accountTieVoiceOutline}
            text="Đạo diễn"
          />
        </Menu.Item>

        <Menu.Item key="/admin/actor">
          <MenuLink to="/admin/actor" icon={kabaddiIcon} text="Diễn viên" />
        </Menu.Item>

        <Menu.Item key="/admin/request">
          <MenuLink
            to="/admin/request"
            icon={commentPlusOutline}
            text="Yêu cầu"
          />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

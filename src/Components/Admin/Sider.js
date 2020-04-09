import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import 'SCSS/Admin/Sider.scss';


const { Sider } = Layout;

export default function MySider({ collapsed }) {
  const location = useLocation()
  
  const selectedKey = location.pathname === '/admin' || location.pathname === '/admin/' 
    ? '/admin/user'
    : location.pathname 
  console.log(location)
  return (

    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="brand">CONTROL PANEL</div>

      <Menu id="sider-menu" theme="dark" mode="inline" selectedKeys={[selectedKey]} defaultSelectedKeys={['/admin/user']}>

        <Menu.Item key="/admin/user">
          <Link to="/admin/user">
            <UserOutlined />
            <span>Người dùng</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/category">
          <Link to="/admin/category">
            <MenuOutlined />
            <span>Thể loại</span>
          </Link>
        </Menu.Item>

      </Menu>
    </Sider>


  )
}

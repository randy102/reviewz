import React, { useState } from 'react'
import AdminRouter from 'Routes/adminRouter'
import MySider from 'Components/Admin/Sider'
import Helmet from 'react-helmet'

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import 'SCSS/Admin/Header.scss';

import MyHeader from 'Components/Admin/Header';


const { Content } = Layout;



export default function Admin(props) {
  const [collapsed, setCollapsed] = useState(false);


  function toggle() {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Helmet>
        <title>Controle Panel</title>
      </Helmet>

      <Layout>
        <MySider collapsed={collapsed} />
        <Layout className="site-layout">

          <MyHeader toggle={toggle} collapsed={collapsed} />

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            
            <AdminRouter {...props} />

          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

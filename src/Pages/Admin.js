import React, { useState } from 'react'
import MySider from 'Components/Admin/Sider'
import Helmet from 'react-helmet'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import User from 'Components/Admin/User/index';
import Category from 'Components/Admin/Category/index'

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

      <Router>
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
              <Switch>
                <Route path="/admin/user">
                  <User />
                </Route>

                <Route path="/admin/category">
                  <Category />
                </Route>
              </Switch>
              
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

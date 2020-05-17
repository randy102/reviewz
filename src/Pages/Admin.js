import React, { useState } from 'react';
import MySider from 'Components/Admin/Sider';
import Helmet from 'react-helmet';

import { Switch, Route, Redirect } from 'react-router-dom';

import User from 'Components/Admin/User';
import Category from 'Components/Admin/Category';
import Movie from 'Components/Admin/Movie';
import Review from 'Components/Admin/Review';

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import 'SCSS/Admin/Header.scss';

import MyHeader from 'Components/Admin/Header';
import Request from 'Components/Admin/Request';

const { Content } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <div>
      <Helmet>
        <title>Reviewz | Control Panel</title>
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
            <Switch>
              <Route path="/admin/user">
                <User />
              </Route>

              <Route path="/admin/category">
                <Category />
              </Route>

              <Route path="/admin/movie">
                <Movie />
              </Route>

              <Route path="/admin/review">
                <Review />
              </Route>

              <Route path="/admin/request">
                <Request />
              </Route>

              <Route exact path="/admin/*">
                <Redirect to="/admin/user" />
              </Route>

              <Route exact path="/admin">
                <Redirect to="/admin/user" />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

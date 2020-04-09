import React from 'react'
import RouteConfig from './config'
import { Switch, Route } from 'react-router-dom'
import guard from './guard'

export default function index() {
  return (
    <Switch>
      {RouteConfig.map(route => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          render={props =>
            guard(
              route,
              props,
              React.lazy(() => import(`Pages/${route.component}`))
            )
          }
        />
      ))}
    </Switch>
  );
}

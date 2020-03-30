import React from 'react'
import RouteConfig from './config'
import { Switch, Route } from 'react-router-dom'
import guard from './guard'

export default function index() {
  return (
   <Switch>
     {RouteConfig.map(route => (
       <Route
         exact={route.exact}
         path={route.path}
         render={(props) => guard(route.authorization, props , React.lazy(() => import(`../Pages/${route.component}`)))}
       />
     ))}
   </Switch>
  )
}

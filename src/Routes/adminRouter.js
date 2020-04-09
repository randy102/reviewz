import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RouteConfig from 'Routes/configAdmin'


export default function AdminRouter() {
  
  return (
    <Switch>
      {RouteConfig.map(route => (
        <Route 
          key={route.path}
          exact={route.exact}
          path={'/admin' + route.path}
          render={props => {
            const Component = React.lazy(() => import(`Components/Admin/${route.component}`))
            return <Component {...props}/>
          }}
        />
      ))}
    </Switch>
  )
}

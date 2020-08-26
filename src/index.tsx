import React from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { getItem, request } from './Util'
import Login from './component/Login'
import Main from './component/Main'


const PrivateRoute = ({ component: Component }: any) => {
  return (
    <Route
      render={props => {
        if (getItem('access_token')) {
          // request.defaults.headers.common['Authorization'] = getItem('access_token')
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: "/login" }} />
        }
      }
      }
    />
  )
}

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter >
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);


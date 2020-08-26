import React from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { getItem } from './Util'
import Login from './component/Login'
import Main from './component/Main'


const PrivateRoute = ({ component: Component }: any) => {
  return (
    <Route
      render={props =>
        getItem('access_token') ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }}
        />
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


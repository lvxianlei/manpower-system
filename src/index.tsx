import React, { ReactType } from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { getItem } from './Util'
import Login from './component/Login'
import Main from './component/Main'

interface PrivateProps {
  componet: ReactType;
  path: string;
}

const requireCredentials = (props: any) => {
  const token = getItem('username')
  if (token) {
    return true
  } else {
    return false
  }
}

const PrivateRoute = ({ component: Component }: any) => {
  return (
    <Route
      render={props =>
        requireCredentials(props) ? <Component {...props} /> : <Redirect to={{ pathname: "/" }}
        />
      }
    />
  )
}

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter >
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Main} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);


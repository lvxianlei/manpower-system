import React from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import ReactDOM from 'react-dom'
import moment from 'moment'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { getSessionItem, request } from './Util'
import Login from './component/Login'
import Main from './component/Main'
import NoMatch from './component/NoMatch';
moment.locale('en')
const { confirm } = Modal
const promptMessage: any = {
  edit: '数据未保存，您确定仍要要离开吗？'
}

const PrivateRoute = ({ component: Component }: any) => {
  return (
    <Route
      render={props => {
        if (getSessionItem('access_token')) {
          request.defaults.headers.common['Authorization'] = "Bearer " + getSessionItem('access_token')
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: "/login" }} />
        }
      }
      }
    />
  )
}

const getUserConfirmation = (page: string, callback: Function) => confirm({
  icon: <ExclamationCircleOutlined />,
  title: promptMessage[page],
  onOk() {
    callback(true)
  },
  onCancel() {
    callback(false)
  }
})


ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter getUserConfirmation={getUserConfirmation}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Main} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);


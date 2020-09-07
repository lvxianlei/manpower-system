import React, { useState } from 'react'
import { Layout, Menu, } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserAddOutlined, BarChartOutlined, DesktopOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import List from '../../List'
import Edit from '../../Edit'
import '../index.scss'
const { Header, Content, Sider } = Layout;

const PrivateRoute = ({ component: Component, path }: any) => {
    return (
        <Route
            render={props => {
                if (path === '/') {
                    return <Redirect to={{ pathname: "/user_info" }} />
                } else {
                    return <Component {...props} />
                }
            }
            }
        />
    )
}

export default (props: any) => {
    const type = props.location.pathname
    const [collapsed, setCollapsed] = useState(false)
    const menuItemClick = (event: any) => {
        props.history.push(event.key)
    }

    return (
        <Layout className="main-container">
            <Sider className="left-sider" trigger={null} collapsible collapsed={collapsed}>
                <h1 className="logo" style={{ height: '64px', boxSizing: 'border-box' }}>AA-BB</h1>
                <Menu mode="inline"
                    defaultSelectedKeys={[type]}
                    defaultOpenKeys={[type]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={(event: any) => menuItemClick(event)}>
                    <Menu.Item key="/user_info" icon={<UserAddOutlined />}>人员信息</Menu.Item>
                    <Menu.Item key="/attendance" icon={<DesktopOutlined />}>考勤信息</Menu.Item>
                    <Menu.Item key="/achievements" icon={<BarChartOutlined />}>绩效统计</Menu.Item>
                    <Menu.Item key="/system_setting" icon={<SettingOutlined />}>系统设置</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content className="site-content">
                    <section className="list-main">
                        <Switch>
                            <PrivateRoute exact path='/' component={List} />
                            <Route exact path='/:type' component={List} />
                            <Route exact path='/:type/edit' component={Edit} />
                        </Switch>
                    </section>
                </Content>
            </Layout>
        </Layout>
    )
}
import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Switch, Route } from 'react-router-dom'
import List from '../../List'
import {
    UserAddOutlined,
    BarChartOutlined,
    DesktopOutlined
} from '@ant-design/icons';
import '../index.scss'
const { Header, Content, Sider } = Layout;
export default (props: any) => {
    const [collapsed, setCollapsed] = useState(false)
    const menuItemClick = (event: any) => {
        props.history.push(event.key)
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <h1 className="title">Manpower System</h1>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={(event: any) => menuItemClick(event)}
                    >
                        <Menu.Item key="/home/userInfo" icon={<UserAddOutlined />}>人员信息</Menu.Item>
                        <Menu.Item key="/home/attendance" icon={<DesktopOutlined />}>考勤信息</Menu.Item>
                        <Menu.Item key="/home/achievements" icon={<BarChartOutlined />}>绩效统计</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route exact path='/home/userInfo' component={List} />
                            <Route exact path='/home/attendance' component={List} />
                            <Route exact path='/home/achievements' component={List} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
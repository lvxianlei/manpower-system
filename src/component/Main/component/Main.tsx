import React, { useState, useEffect, useReducer } from 'react'
import { Layout, Menu, } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import List from '../../List'
import Edit from '../../Edit'
import '../index.scss'
import { request } from '../../../Util'
import { MENU_URL } from '../../../Config/API'
import IconType from '../../common/IconType'
const { Header, Content, Sider } = Layout;

const initState = {
    data: [],
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_Main_START":
            return { ...state, loading: false }
        case "FETCH_Main_SUCCESS":
            return { data: action.paload, loading: true }
        case "FETCH_Main_ERROR":
            return { data: [], error: action.paload }
    }
}

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
    const [mainData, dispatch] = useReducer(reducer, initState)
    const menuItemClick = (event: any) => {
        props.history.push(event.key)
    }

    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_Main_START' })
            try {
                const fetchMainData: any = await request.post(MENU_URL, {})
                dispatch({ type: 'FETCH_Main_SUCCESS', paload: fetchMainData.data })
            } catch (error) {
                dispatch({ type: 'FETCH_Main_ERROR', paload: error })
            }
        })()
    }, [])

    return (
        <Layout className="main-container">
            <Sider className="left-sider" trigger={null} collapsible collapsed={collapsed}>
                <h1 className="logo" style={{ height: '64px', boxSizing: 'border-box' }}>AA-BB</h1>
                <Menu mode="inline"
                    defaultSelectedKeys={[type]}
                    defaultOpenKeys={[type]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={(event: any) => menuItemClick(event)}>
                    {
                        mainData.data.map((menu: any, index: number) =>
                            <Menu.Item key={`/${menu.name}`} icon={IconType[menu.name]}>{menu.label}</Menu.Item>)
                    }
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
                        {mainData.loading && <Switch>
                            <PrivateRoute exact path='/' component={List} />
                            <Route exact path='/:type' component={List} />
                            <Route exact path='/:type/edit' component={Edit} />
                            <Route exact path='/:type/edit/:id' component={Edit} />
                        </Switch>}
                    </section>
                </Content>
            </Layout>
        </Layout>
    )
}
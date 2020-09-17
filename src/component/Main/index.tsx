import React, { useState, useEffect, useReducer } from 'react'
import { Layout, Menu, Spin, } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import List from '../List'
import Edit from '../Edit'
import Auth from '../Auth'
import NoMatch from '../NoMatch'
import Department from '../Department'
import './index.scss'
import { request } from '../../Util'
import { MENU_URL } from '../../Config/API'
import IconType from '../common/IconType'
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu
const initState = {
    data: [],
    loading: false
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_Main_START":
            return { ...state, loading: true }
        case "FETCH_Main_SUCCESS":
            return { data: action.paload, loading: false }
        case "FETCH_Main_ERROR":
            return { data: [], error: action.paload, loading: false }
    }
}

const PrivateRoute = ({ component: Component, path }: any) => (
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


// const ExactRoute = ({ component: Component, exactData, computedMatch, path }: any) => <Route
//     render={props => {
//         console.log(exactData, computedMatch.params.type)
//         return exactData.includes(computedMatch.params.type) ?
//             <Component {...props} path={path} match={computedMatch} />
//             :
//             <Redirect to={{ pathname: "/nomatch/404" }} />
//     }}
// />



// const flatMenu = (menuData: Array<any>) => {
//     const flatArray: Array<string> = []
//     const flat = (menuArray: Array<any>) => {
//         menuArray.forEach((menu: any) => {
//             if (!menu.child) {
//                 flatArray.push(menu.name)
//             } else {
//                 flat(menu.child)
//             }
//         })
//     }
//     flat(menuData);
//     return flatArray
// }

export default (props: any) => {
    const type = props.location.pathname
    const [collapsed, setCollapsed] = useState(false)
    const [mainData, dispatch] = useReducer(reducer, initState)
    const { loading, data: menuData } = mainData

    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_Main_START' })
            try {
                const fetchMainData: any = await request.post(MENU_URL, {})
                dispatch({ type: 'FETCH_Main_SUCCESS', paload: fetchMainData.data })
            } catch (error) {
                dispatch({ type: 'FETCH_Main_ERROR', paload: error.data })
            }
        })()
    }, [dispatch])

    return (
        <Spin spinning={loading}>
            <Layout className="main-container">
                <Sider className="left-sider" trigger={null} collapsible collapsed={collapsed}>
                    <h1 className="logo" style={{ height: '64px', boxSizing: 'border-box' }}>AA-BB</h1>
                    <Menu mode="inline"
                        defaultSelectedKeys={[type]}
                        defaultOpenKeys={[type]}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={(event: any) => props.history.push(event.key)}>
                        {
                            menuData.map((menu: any) => menu.child ? <SubMenu title={menu.label} key={menu.name} icon={IconType[menu.name]}>
                                {menu.child.map((child: any) => <Menu.Item key={`/${child.name}`} icon={IconType[child.name]}>{child.label}</Menu.Item>)}
                            </SubMenu> : <Menu.Item key={`/${menu.name}`} icon={IconType[menu.name]}>{menu.label}</Menu.Item>)
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
                            <Switch>
                                <PrivateRoute exact path='/' component={List} />
                                <Route exact path='/department_setting' component={Department} />
                                <Route exact path='/:type' component={List} />
                                <Route exact path='/:type/edit' component={Edit} />
                                <Route exact path='/:type/auth/:id' component={Auth} />
                                <Route exact path='/:type/edit/:id' component={Edit} />
                                <Route exact path='/nomatch/:status' component={NoMatch} />
                                <Route component={NoMatch} />
                            </Switch>
                        </section>
                    </Content>
                </Layout>
            </Layout>
        </Spin>
    )
}
import React, { useState, useReducer, useEffect } from 'react'
import { Prompt } from 'react-router-dom'
import { Form, Switch, Modal, Row, Col, Button } from 'antd'
import { AUTH_URL } from '../../Config/API'
import { request } from '../../Util'
import './index.scss'
const { success } = Modal

const layout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
}

const initState = {
    auth_menu: [],
    auth_btn: [],
    auth_department: [],
    data: {
        auth_btn: [],
        auth_menu: [],
    },
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_AUTH_START":
            return { ...state, loading: false }
        case "FETCH_AUTH_SUCCESS":
            return { ...state, ...action.paload }
        case "FETCH_AUTH_ERROR":
            return { ...state, error: action.paload }
    }
}

export default (props: any) => {
    const { type, id } = props.match.params
    const [authData, dispatch] = useReducer(reducer, initState)
    const [isLeave, setIsLeave] = useState(true)
    const [form] = Form.useForm()
    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_AUTH_START' })
            try {
                const authData: any = await request.post(AUTH_URL, { type, id })
                dispatch({ type: 'FETCH_AUTH_SUCCESS', paload: authData.data })
                form.setFieldsValue(authData.data.data)
            } catch (error) {
                dispatch({ type: 'FETCH_AUTH_ERROR', paload: error })
            }
        })()
    }, [dispatch, type, id, form])

    const onFinish: Function = async (value: any) => {
        const postAuthMenu = authData.auth_menu.filter((menu: any) => value[menu.name]).map((menu: any) => menu.name).join(',')
        const postAuthBtn = authData.auth_btn.filter((btn: any) => value[btn.name]).map((btn: any) => btn.name).join(',')
        try {
            const saveData: any = await request.put(AUTH_URL, { auth_menu: postAuthMenu, auth_btn: postAuthBtn, id })
            if (saveData.code === 1) {
                success({
                    title: '保存',
                    content: '数据成功保存...',
                    okText: '确认',
                    onOk() {
                        setIsLeave(false)
                        props.history.go(-1)
                    }
                })
            }
        } catch (error) {
            setIsLeave(true)
        }
    }
    return (
        <>
            <Prompt when={isLeave} message={() => 'edit'} />
            <Form name="manpower-auth" {...layout} form={form} labelAlign="right" onFinish={event => onFinish(event)}>
                <Row>
                    <Col span={6} offset={2}>
                        <div className='ant-col ant-form-item-label ant-col-xs-12 ant-col-sm-4'>菜单权限</div>
                        {authData.auth_menu.map((menu: any) => <Form.Item valuePropName="checked" key={menu.name} name={menu.name} label={menu.label}>
                            <Switch />
                        </Form.Item>)}
                    </Col>
                    <Col span={6} offset={2}>
                        <div className='ant-col ant-form-item-label ant-col-xs-12 ant-col-sm-4'>按钮权限</div>
                        {authData.auth_btn.map((menu: any) => <Form.Item valuePropName="checked" key={menu.name} name={menu.name} label={menu.label}>
                            <Switch />
                        </Form.Item>)}
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={9} >
                        <Button type="primary" htmlType="submit" className="login-form-button">确认</Button>
                        <Button style={{ marginLeft: "10px" }} type="primary" htmlType="submit" className="login-form-button">取消</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { setSessionItem, ErrorInfo } from '../../Util'
import './index.scss'

interface SubmitValue {
    username: string,
    password: string
}

export default (props: any) => {
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [errorInfo, setErrorInfo] = useState('')
    const onFinish = async (values: SubmitValue) => {
        const postData = new URLSearchParams()
        postData.append('username', values.username)
        postData.append('password', values.password)
        try {
            setLoaded(true)
            const data = await axios.request({
                url: 'http://localhost:8000/login',
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf8' },
                data: postData
            })
            setLoaded(false)
            setSessionItem(data.data.data)
            props.history.push('/')
        } catch (error) {
            setError(true)
            setLoaded(false)
            setErrorInfo(ErrorInfo[error.response ? error.response.status : 999])
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <section className="login">
            <div className="text-center">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(event: any) => onFinish(event)}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item>
                        {error ? <Alert message={errorInfo} type="error" showIcon /> : ''}
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={loaded} htmlType="submit" className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}
import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { setItem } from '../../../Util'
import '../index.scss'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default (props: any) => {
    const onFinish = async (values: any) => {
        const postData = new URLSearchParams()
        postData.append('username', values.username)
        postData.append('password', values.password)
        const data = await axios.request({
            url: 'http://192.168.1.125:8000/login',
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf8' },
            data: postData
        })

        console.log(data.data, '--------------');
        // setItem(values)
        // props.history.push('/home')
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);

    }

    return (
        <section className="main">
            <div className="center">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
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
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}
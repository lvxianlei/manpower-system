import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import '../index.scss'
const IconFont: any = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2014371_vucntjl36is.js'
})

export default (props: any) => {
    const { type } = props.match.params
    const onFinish: Function = (value: any) => {
        console.log(value, '------submit------')
    }

    return (
        <Form name="nest-messages" onFinish={event => onFinish}>
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'website']} label="Website">
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">确定</Button>
            </Form.Item>
        </Form>
    )
}
import React, { useState } from 'react'
import { Prompt } from 'react-router-dom'
import { Form, Switch, Modal, Row, Col, Button } from 'antd'
import { AUTH_URL } from '../../Config/API'
import { request } from '../../Util'
import './index.scss'
const { confirm } = Modal

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

export default (props: any) => {
    const [isLeave, setIsLeave] = useState(true)
    const [form] = Form.useForm()

    const onFinish: Function = async (value: any) => {
        try {
            const saveData: any = await request.post(AUTH_URL, {})
            // if (saveData.code === 1) {
            //     success({
            //         title: '保存',
            //         content: '数据成功保存...',
            //         okText: '确认',
            //     })
            //     setIsLeave(false)
            //     props.history.go(-1)
            // }
        } catch (error) {
            setIsLeave(true)
        }
    }
    return (
        <>
            <Prompt when={isLeave} message={location => {
                confirm({
                    title: '数据未保存，您确定仍要要离开吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        setIsLeave(false)
                        props.history.go(-1)
                    }
                })
                return false;
            }} />
            <Form name="manpower-auth" {...layout} form={form} labelAlign="right" onFinish={event => onFinish(event)}>
                <Row>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}1" label="人员信息" valuePropName="checked" >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}2" label="人员信息" valuePropName="checked" >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}3" label="人员信息" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}4" label="人员信息" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}5" label="人员信息" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}6" label="人员信息" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}7" label="人员信息" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={2} >
                        <Form.Item name="{item.name}8" label="人员信息" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={10} >
                        <Col span={14} offset={5} >
                            <Button type="primary" htmlType="submit" className="login-form-button">确认</Button>
                            <Button style={{ marginLeft: "10px" }} type="primary" htmlType="submit" className="login-form-button">取消</Button>
                        </Col>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
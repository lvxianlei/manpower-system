import React, { useEffect, useReducer, useState } from 'react'
import { Prompt } from 'react-router-dom'
import { Form, Button, Spin, Row, Col, Modal } from 'antd'
import moment from 'moment'
import { EDIT_URL } from '../../Config/API'
import { request } from '../../Util'
import FormType from '../common/FormType'
import './index.scss'
const { success } = Modal
const initState = {
    data: {},
    head: [],
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_EDIT_START":
            return { ...state, loading: false }
        case "FETCH_EDIT_SUCCESS":
            return { ...state, ...action.paload }
        case "FETCH_EDIT_ERROR":
            return { ...state, error: action.paload }
    }
}

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
    const { type, id } = props.match.params
    const [editData, dispatch] = useReducer(reducer, initState)
    const [isLeave, setIsLeave] = useState(true)
    const [form] = Form.useForm()

    const formatTime = (editData: any) => {
        editData.head.forEach((headItem: any) => {
            if (headItem.type === 'time') {
                editData.data[headItem.name] = moment(editData.data[headItem.name], headItem.format)
            }
        })
        return editData
    }

    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_EDIT_START' })
            try {
                const editData: any = await request.post(EDIT_URL, { type, id })
                dispatch({ type: 'FETCH_EDIT_SUCCESS', paload: formatTime(editData.data) })
                form.setFieldsValue(editData.data.data)
            } catch (error) {
                dispatch({ type: 'FETCH_EDIT_ERROR', paload: error })
            }
        })()
    }, [dispatch, type, id, form])

    const onFinish: Function = async (value: any) => {
        try {
            const saveData: any = await request.put(EDIT_URL, { type, id, ...value })
            if (saveData.code === 1) {
                success({
                    title: '保存',
                    content: '数据成功保存...',
                    okText: '确认',
                })
                setIsLeave(false)
                props.history.go(-1)
            }
        } catch (error) {
            setIsLeave(true)
        }
    }

    return (
        <Spin spinning={editData.loading}>
            <Prompt when={isLeave} message={() => 'edit'} />
            <Form name="manpower-edit" {...layout} form={form} labelAlign="right" onFinish={event => onFinish(event)}>
                <Row>
                    {editData.head.map((item: any) =>
                        <Col span={9} offset={2} key={item.name}>
                            <Form.Item name={item.name} label={item.label} rules={[{ required: true }]}>
                                <FormType type={item.type} data={item} />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col span={6} offset={9} >
                        <Button type="primary" htmlType="submit" className="login-form-button">确认</Button>
                        <Button style={{ marginLeft: "10px" }} type="primary" htmlType="submit" className="login-form-button">取消</Button>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}
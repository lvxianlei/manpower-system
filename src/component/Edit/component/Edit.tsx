import React, { useEffect, useReducer } from 'react'
import { Form, Input, Button, Spin, Row, Col } from 'antd'
import { EDIT_URL } from '../../../Config/API'
import { request } from '../../../Util'
import '../index.scss'

const initState = {
    data: [],
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_EDIT_START":
            return { ...state, loading: false }
        case "FETCH_EDIT_SUCCESS":
            return { ...state, data: action.paload }
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
    const { type } = props.match.params
    const [editData, dispatch] = useReducer(reducer, initState)
    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_EDIT_START' })
            try {
                const editData: any = await request.post(EDIT_URL, { type })
                dispatch({ type: 'FETCH_EDIT_SUCCESS', paload: editData.data })
            } catch (error) {
                dispatch({ type: 'FETCH_EDIT_ERROR', paload: error })
            }
        })()
    }, [dispatch, type])

    const onFinish: Function = async (value: any) => {
        console.log(value, '------submit------')
        const saveData: any = await request.put(EDIT_URL, { type, ...value })
        if (saveData.code === 1) {
            props.history.go(-1)
        }
    }

    return (
        <Spin spinning={editData.loading}>
            <Form name="nest-messages" {...layout} labelAlign="right" onFinish={event => onFinish(event)}>
                <Row>
                    {editData.data.map((item: any) =>
                        <Col span={9} offset={2} key={item.name}>
                            <Form.Item name={item.name} label={item.label} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" className="login-form-button">确认</Button>
                        <Button style={{ marginLeft: "10px" }} type="primary" htmlType="submit" className="login-form-button">取消</Button>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}
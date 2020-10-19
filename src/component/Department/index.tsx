import React, { useState, useReducer, useEffect } from 'react'
import { Prompt } from 'react-router-dom'
import { Modal, Spin, Card, Row, Col, Space, Button, Form, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { LIST_URL, DEPARTMENT_URL } from '../../Config/API'
import { request } from '../../Util'
import './index.scss'
const { Meta } = Card
const { success, confirm } = Modal
const initState = {
    data: [],
    error: '',
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_DEPARTMENT_START":
            return { ...state, loading: true }
        case "FETCH_DEPARTMENT_SUCCESS":
            return { ...state, ...action.paload, loading: false }
        case "FETCH_DEPARTMENT_ERROR":
            return { ...state, error: action.paload, loading: false }
        case "FETCH_DEPARTMENT_DELETE":
            return {
                ...state, data: state.data.filter((dataItem: any) => dataItem.name !== action.paload.name
                    && dataItem.label !== action.paload.label),
                loading: false
            }
        case "FETCH_DEPARTMENT_ADD":
            return { ...state, data: state.data.concat(action.paload), loading: false }
        case "FETCH_DEPARTMENT_EDIT":
            return { ...state, data: state.data.concat(action.paload), loading: false }
    }
}
const initFormData = {
    name: "",
    label: "",
    remark: ""
}
export default (props: any) => {
    const [editModel, setEditModel] = useState({ title: '', visible: false, isLeave: false, data: initFormData })
    const [departmentData, dispatch] = useReducer(reducer, initState)
    const [form] = Form.useForm()
    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_DEPARTMENT_START' })
            try {
                const departmentData: any = await request.post(LIST_URL, { type: 'department_setting' })
                if (departmentData.code === 1) {
                    dispatch({ type: 'FETCH_DEPARTMENT_SUCCESS', paload: departmentData.data })
                } else {
                    props.history.push('/nomatch/500')
                }
            } catch (error) {
                dispatch({ type: 'FETCH_DEPARTMENT_ERROR', paload: error.code })
            }
        })()
    }, [dispatch, props.history])

    const onFinish = async () => {
        try {
            const values = await form.validateFields()
            if (editModel.title === '新增') {
                const addDepartment = await request.post(DEPARTMENT_URL, values)
                success({
                    title: '保存',
                    content: addDepartment.data,
                    okText: '确认',
                    onOk() {
                        setEditModel({
                            ...editModel,
                            visible: false
                        })
                        dispatch({ type: 'FETCH_DEPARTMENT_ADD', paload: values })
                    }
                })
            } else {
                const editDepartment = await request.post(DEPARTMENT_URL, values)
                success({
                    title: '保存',
                    content: editDepartment.data,
                    okText: '确认',
                    onOk() {
                        setEditModel({
                            ...editModel,
                            visible: false
                        })
                        dispatch({ type: 'FETCH_DEPARTMENT_EDIT', paload: values })
                    }
                })
            }
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    }

    const handleDelete = (values: any) => {
        confirm({
            title: '删除',
            content: `确定要删除？`,
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    const deleteDepartment = await request.delete(DEPARTMENT_URL, { data: values })
                    dispatch({ type: 'FETCH_DEPARTMENT_DELETE', paload: values })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <Spin spinning={departmentData.loading}>
            <Prompt when={editModel.isLeave} message={() => 'edit'} />
            <div className="department-head">
                <Space>
                    <Button type="primary" onClick={() => {
                        setEditModel({ title: '新增', visible: true, isLeave: true, data: initFormData });
                        form.setFieldsValue(initFormData)
                    }}>新增</Button>
                </Space>
            </div>
            <Modal
                title={editModel.title}
                visible={editModel.visible}
                onCancel={() => setEditModel({ ...editModel, visible: false })}
                onOk={onFinish}
            >
                <Form name="department_form" form={form} layout="vertical">
                    <Form.Item name="name" label="存入英文名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="label" label="部门名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <div className="department">
                <Row gutter={[16, 16]}>
                    {departmentData.data.map((item: any) => <Col span={4} key={item.label}>
                        <Card
                            style={{ border: '1px solid #ccc' }}
                            size="small"
                            actions={[
                                <DeleteOutlined key="DeleteOutlined" onClick={() => handleDelete(item)} />,
                                // <EditOutlined key="edit" onClick={() => {
                                //     setEditModel({ title: '编辑', visible: true, isLeave: true, data: item });
                                //     form.setFieldsValue(item)
                                // }} />
                            ]}
                        > <Meta
                                title={item.label}
                                description={item.name}
                            /></Card>
                    </Col>)}
                </Row>
            </div>
        </Spin>
    )
}
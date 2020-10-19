import React from 'react';
import { Form, Row, Col, Input, Button, Select } from 'antd';

interface Query {
    onSeach: (values: any) => void;
    onReset?: Function;
}

export default (props: Query) => {
    const [form] = Form.useForm()
    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={props.onSeach}
        >
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item name='username' label='姓名' >
                        <Input placeholder="人员姓名" />
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item name='id_number' label='身份证号'>
                        <Input placeholder="身份证号" />
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item name='status' label='状态'>
                        <Select placeholder="是否在职">
                            <Select.Option value='1'>在职</Select.Option>
                            <Select.Option value='2'>离职</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            props.onReset && props.onReset()
                        }}
                    >清除</Button>
                </Col>
            </Row>
        </Form>
    )
}
import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
export default () => {
    // const [expand, setExpand] = useState(false)
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    }

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item name='' label='姓名' rules={[{
                        required: true,
                        message: 'Input something!',
                    }]}>
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item name='' label='身份证号' rules={[{
                        required: true,
                        message: 'Input something!',
                    }]}>
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item name='' label='状态' rules={[{
                        required: true,
                        message: 'Input something!',
                    }]}>
                        <Input placeholder="placeholder" />
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
                        }}
                    >清除</Button>
                </Col>
            </Row>
        </Form>
    )
}
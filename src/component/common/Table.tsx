import React from 'react'
import { Table, Tag, Space } from 'antd'
export default () => {
    const columns = [
        {
            title: '操作',
            key: 'action',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <a>编辑</a>
                    <a>删除</a>
                </Space>
            ),
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '身份证号',
            dataIndex: 'idCard',
            key: 'idCard',
        },

    ]

    const data = [
        {
            key: '1',
            name: '张三',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            idCard: '321321321321'
        },
        {
            key: '2',
            name: '李四',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            idCard: '321321321321'
        },
        {
            key: '3',
            name: '王五',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            idCard: '321321321321'
        },
    ]
    return <Table columns={columns} dataSource={data} />
}
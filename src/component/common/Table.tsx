import React from 'react'
import { Table, Tag, Space } from 'antd'
interface Table_prop {
    columns: Array<any>
    dataSource: Array<any>
}
export default (props: Table_prop) => {
    const action: any = {
        title: '操作',
        key: 'action',
        render: (text: string, record: any) => (
            <Space size="middle">
                <a>编辑</a>
                <a>删除</a>
            </Space>
        ),
    }
    const columns = props.columns.map((item: any) => ({
        key: item.name,
        title: item.label,
        dataIndex: item.name
    }))
    const data = props.dataSource.map((item: any) => ({ ...item, key: item.idNumber + item.username }))
    return <Table columns={columns} dataSource={data} />
}
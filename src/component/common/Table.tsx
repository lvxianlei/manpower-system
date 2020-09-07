import React from 'react'
import { Table, Space, Button } from 'antd'
import BtnType from './BtnType'
interface Table_prop {
    columns: Array<any>
    dataSource: Array<any>
}
export default (props: Table_prop) => {
    const action: any = {
        title: '操作',
        key: 'pageButton',
        render: (text: any, record: any) => (
            <Space size="middle">
                {
                    text.pageButton
                    &&
                    text.pageButton.map((button: any, index: number) =>
                        BtnType[button.type].render({ ...button, ...props })
                    )}
            </Space>
        )
    }

    const columns = props.columns.map((item: any) => ({
        key: item.name,
        title: item.label,
        dataIndex: item.name
    }))
    columns.unshift(action)
    const data = props.dataSource.map((item: any) => ({ ...item, key: item.idNumber + item.username }))
    return <Table columns={columns} dataSource={data} />
}
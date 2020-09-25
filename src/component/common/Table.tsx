import React from 'react'
import { Table, Space } from 'antd'
import BtnType from './BtnType'
import './Table.scss'
interface Table_prop {
    columns: Array<any>;
    dataSource: Array<any>;
    onDelete?: Function
}
export default (props: Table_prop) => {
    const action: any = {
        title: '操作',
        key: 'pageButton',
        render: (text: any, record: any) => (
            <div style={{
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'nowrap',
                minWidth: '50px'
            }}>
                <Space size="small">
                    {
                        text.pageButton
                        &&
                        text.pageButton.map((button: any, index: number) => (<BtnType
                            key={button.name}
                            data={{ ...button, id: text.id }}
                            type={button.type}
                            onDelete={props.onDelete}
                        />)
                        )}
                </Space>
            </div>
        )
    }

    const columns = props.columns.map((item: any) => ({
        key: item.name,
        title: item.label,
        dataIndex: item.name,
        className: 'table-th',
        render: (text: any, record: any) => <div style={{
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'nowrap',
            minWidth: '50px'
        }}>{text}</div>
    }))
    columns.unshift(action)
    const data = props.dataSource.map((item: any) => ({ ...item, key: (item.id_number + item.id) || item.user_id }))
    return <Table columns={columns} dataSource={data} style={{ whiteSpace: 'nowrap' }} scroll={{ x: true, y: 1200 }} />
}
import React from 'react';
import { Button, Space, Upload } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import Query from '../../common/Query'
import Table from '../../common/Table'
import '../index.scss'
const IconFont: any = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2014371_vucntjl36is.js'
})

export default (props: any) => {
    return (
        <section>
            <Space>
                <Button type="primary">新增</Button>
                <Upload>
                    <Button><IconFont type="icon-Exceldaoru" />Excel 导入</Button>
                </Upload>
            </Space>
            <Query />
            <Table />
        </section>
    )
}
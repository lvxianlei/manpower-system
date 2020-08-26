import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Upload } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import Query from '../../common/Query'
import Table from '../../common/Table'
import '../index.scss'
const IconFont: any = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2014371_vucntjl36is.js'
})

export default (props: any) => {
    console.log(props)
    return (
        <section>
            <Space>
                <Button type="primary"><Link to={`/${props.match.params.type}/edit`}>新增</Link></Button>
                <Upload
                    accept=".xls,.xlsx"
                >
                    <Button><IconFont type="icon-Exceldaoru" />Excel 导入</Button>
                </Upload>
            </Space>
            <Query />
            <Table />
        </section>
    )
}
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Upload } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import { request } from '../../../Util'
import { USER_URL } from '../../../Config/API'
import Query from '../../common/Query'
import Table from '../../common/Table'
import '../index.scss'
const IconFont: any = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2014371_vucntjl36is.js'
})

export default (props: any) => {
    const { type } = props.match.params

    useEffect(() => {
        (async () => {
            const listData = await request.post(USER_URL, null)
            console.log(listData)
        })()
    })

    return (
        <section>
            <Space>
                <Button type="primary"><Link to={`/${props.match.params.type}/edit`}>新增</Link></Button>
                {type !== 'system_setting' && <Upload
                    accept=".xls,.xlsx"
                >
                    <Button><IconFont type="icon-Exceldaoru" />Excel 导入</Button>
                </Upload>}
            </Space>
            <Query />
            <Table />
        </section>
    )
}
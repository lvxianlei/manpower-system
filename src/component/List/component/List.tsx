import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Upload, Spin } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import { request } from '../../../Util'
import { LIST_URL } from '../../../Config/API'
import Query from '../../common/Query'
import Table from '../../common/Table'
import '../index.scss'
const IconFont: any = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2014371_vucntjl36is.js'
})

const initState = {
    head: [],
    data: [],
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_LIST_START":
            return { ...state, loading: false }
        case "FETCH_LIST_SUCCESS":
            return { ...state, ...action.paload }
        case "FETCH_LIST_ERROR":
            return { ...state, error: action.paload }
    }
}

export default (props: any) => {
    const { type } = props.match.params
    const [listData, dispatch] = useReducer(reducer, initState)
    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_LIST_START' })
            try {
                const listData: any = await request.post(LIST_URL, { type })
                dispatch({ type: 'FETCH_LIST_SUCCESS', paload: listData.data })
            } catch (error) {
                dispatch({ type: 'FETCH_LIST_ERROR', paload: error })
            }
        })()
    }, [dispatch, type])

    return (
        <Spin spinning={listData.loading}>
            <Space>
                <Button type="primary"><Link to={`/${props.match.params.type}/edit`}>新增</Link></Button>
                {type !== 'system_setting' && <Upload
                    accept=".xls,.xlsx"
                >
                    <Button><IconFont type="icon-Exceldaoru" />Excel 导入</Button>
                </Upload>}
            </Space>
            <Query />
            <Table columns={listData.head} dataSource={listData.data} />
        </Spin>
    )
}
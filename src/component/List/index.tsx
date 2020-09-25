import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Upload, Spin, Modal } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import { request, getSessionItem } from '../../Util'
import { LIST_URL, UPLOAD_URL } from '../../Config/API'
import Query from '../common/Query'
import Table from '../common/Table'
import './index.scss'
const { success, error } = Modal
const IconFont: any = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2014371_vucntjl36is.js'
})

const initState = {
    head: [],
    data: [],
    error: '',
    loading: true
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_LIST_START":
            return { ...state, loading: true }
        case "FETCH_LIST_SUCCESS":
            return { ...state, ...action.paload, loading: false }
        case "FETCH_LIST_ERROR":
            return { ...state, error: action.paload, loading: false }
        case "FETCH_LIST_DELETE":
            return { ...state, data: state.data.filter((dataItem: any) => dataItem.id !== action.paload.id), loading: false }
        case "FETCH_LIST_UPDATE":
            return { ...state, data: state.data.concat(action.paload), loading: false }
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
                if (listData.code === 1) {
                    dispatch({ type: 'FETCH_LIST_SUCCESS', paload: listData.data })
                } else {
                    props.history.push('/nomatch/500')
                }
            } catch (error) {
                dispatch({ type: 'FETCH_LIST_ERROR', paload: error.code })
            }
        })()
    }, [dispatch, type, props.history])

    const uploadChange = (event: any) => {
        if (event.file.status === 'done') {
            const resData = event.file.response
            if (resData.code === 1) {
                success({
                    title: '保存',
                    content: '数据成功保存...',
                    okText: '确认',
                    onOk() {
                        dispatch({ type: 'FETCH_LIST_UPDATE', paload: resData.data })
                    }
                })
            } else if (resData.code === -1) {
                error({
                    title: '当前会话超时，请重新登陆',
                    content: '打开网站时间过长，或长时间未操作',
                    okText: '登录',
                    onOk: () => props.history.replace('/login')
                })
            } else {
                error({
                    title: '保存失败...',
                    content: <div style={{ width: '100%', height: '60px', overflowY: 'auto' }}>{JSON.stringify(resData.msg)}</div > || '',
                    okText: '确认'
                })
            }
        }
    }

    const onDelete = (deleteId: number) => {
        dispatch({ type: 'FETCH_LIST_DELETE', paload: { id: deleteId } })
    }

    return (
        <Spin spinning={listData.loading}>
            <Space>
                <Button type="primary"><Link to={`/${props.match.params.type}/edit`}>新增</Link></Button>
                {type !== 'system_setting' && <Upload
                    accept=".xls,.xlsx"
                    action={UPLOAD_URL}
                    method="POST"
                    showUploadList={false}
                    headers={{ 'Authorization': "Bearer " + getSessionItem('access_token') }}
                    data={{ type }}
                    onChange={uploadChange}
                >
                    <Button><IconFont type="icon-Exceldaoru" />Excel 导入</Button>
                </Upload>}
            </Space>
            <Query />
            <Table columns={listData.head} dataSource={listData.data} onDelete={onDelete} />
        </Spin>
    )
}
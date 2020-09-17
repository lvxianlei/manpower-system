import React from 'react'
import { Result, Button } from 'antd'
const resultInfo: any = {
    400: '用户不存在',
    401: '密码错误',
    403: '用户得到授权，但是访问被禁止。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器错误,请联系管理员...',
    502: '服务器错误,请联系管理员...',
    503: '服务器错误,请联系管理员...',
    504: '网关超时。',
    999: '服务已停止维护'
}
export default (props: any) => {
    const { status } = props.match.params
    return <Result
        status={status || 404}
        title={status || 404}
        subTitle={resultInfo[status || 404]}
        extra={<Button type="primary" onClick={() => props.history.replace('/')}>回到首页</Button>}
    />
}
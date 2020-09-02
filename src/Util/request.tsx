import React from 'react'
import axios from 'axios'
import { notification, Button } from 'antd'
import { BASE_URL } from '../Config/API'
import { removeItem } from '../Util'
const reqest = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    transformRequest: [(data) => {
        const postData = new URLSearchParams()
        Object.keys(data).forEach((dataItem: string) => {
            postData.append(dataItem, data[dataItem])
        })
        return postData
    }]
})

const refrenceLogin = () => {
    removeItem("access_token")
    window.location.replace('/login')
}

reqest.interceptors.response.use((response) => {
    const { data } = response
    if (data.code === -1) {
        notification.warning({
            message: '当前会话超时，请重新登陆',
            description: '打开网站时间过长，或长时间未操作',
            btn: (<Button type="primary" onClick={refrenceLogin}>登陆</Button>),
            duration: 0
        })
    } else {
        return response.data;
    }
}, (error) => {
    return Promise.reject(error)
})

export default reqest
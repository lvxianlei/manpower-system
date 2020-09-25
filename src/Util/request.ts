import axios from 'axios'
import { Modal } from 'antd'
import { BASE_URL } from '../Config/API'
import { removeItem } from '../Util'
const { error } = Modal
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
    switch (data.code) {
        case -1:
            error({
                title: '当前会话超时，请重新登陆',
                content: '打开网站时间过长，或长时间未操作',
                okText: '登录',
                onOk: refrenceLogin
            })
            break;
        case 0:
            error({
                title: '权限',
                content: JSON.stringify(data.msg),
                okText: '登录',
                onOk: refrenceLogin
            })
            break;
        case 3:
            error({
                title: '请求错误',
                content: JSON.stringify(data.msg) || '',
                okText: '确定'
            })
            return ({ code: 500 })
        default:
            return response.data;
    }
}, (error) => {
    return Promise.reject(error)
})

export default reqest
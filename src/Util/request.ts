import axios from 'axios'
import { BASE_URL } from '../Config/API'
import { removeItem } from '../Util'
const reqest = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    transformRequest: [(data) => {
        const postData = new URLSearchParams
        Object.keys(data).forEach((dataItem: string) => {
            postData.append(dataItem, data[dataItem])
        })
        return postData
    }]
})

reqest.interceptors.response.use(function (response) {
    const { data } = response
    if (data.code === -1) {
        removeItem("access_token")
        window.location.replace('/login')
    } else {
        return response.data;
    }
}, function (error) {
    return Promise.reject(error)
})

export default reqest
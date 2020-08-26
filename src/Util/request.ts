import axios from 'axios'
import { BASE_URL } from '../Config/API'
const reqest = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    transformRequest: [(data: any) => {
        return data;
    }]
})

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default reqest
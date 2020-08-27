import axios from 'axios'
import { BASE_URL } from '../Config/API'
const reqest = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
})

reqest.interceptors.response.use(function (response) {
    const { data } = response
    if (data.code > -1) {
        return response.data;
    } else {
        return Promise.reject(data)
    }
}, function (error) {
    return Promise.reject(error);
});

export default reqest
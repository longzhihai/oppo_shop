// 封装一个axios请求
import axios from 'axios'

const baseUrl = 'http://10.3.136.109:2108'

const instance = axios.create({
    baseURL: baseUrl + '/api'
})

instance.baseUrl = baseUrl;
// console.log(instance);
export default instance;
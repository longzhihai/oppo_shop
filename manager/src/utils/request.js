// 封装一个axios请求
import axios from 'axios'

const baseUrl = 'http://10.3.136.109:2108'

const instance = axios.create({
    baseURL: baseUrl + '/api'
})

instance.baseUrl = baseUrl;
// console.log(instance);

// 请求拦截：在请求发出去之前的操作
// 可以在请求拦截中处理一些公共操作，如在请求头发送token
// instance.interceptors.request.use(function (config) {
//     let userInfo = localStorage.getItem('userInfo'); // null
//     try{
//         userInfo = JSON.parse(userInfo) || {};
//     }catch(err){
//         userInfo = {}
//     }
//     // 设置后，所有的请求，会自动带上Authorization
//     config.headers.Authorization = userInfo.authorization;

//     return config
// });


// // 响应拦截：在请求后来后，then操作之前执行
// instance.interceptors.response.use(function (response) {
//     // 操作response
//     return response
// });

export default instance;
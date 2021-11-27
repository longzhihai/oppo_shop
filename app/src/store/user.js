import { updateStroage } from '@/utils'
import request from '../utils/request'

let userInfo = localStorage.getItem('userInfo'); // null
try {
    userInfo = JSON.parse(userInfo) || [];
} catch (err) {
    userInfo = []
}
export default {
    namespaced: true,
    state: {
        userInfo

    },
    mutations: {

        // 用户信息更新状态后写入本地存储  在请求异步操作完成以后 把获取的data写入 配合actions完成整个操作
        login(state, payload) {
            // payload参数  需要更新的数据
            state.userInfo = payload[0]
            updateStroage('userInfo', state.userInfo)
        },
        logout(state) {
            state.userInfo = {}
            updateStroage('userInfo', {})
        }
    },
    getters: {

        isLogin(state) {
            // 返回一个 布尔值 取两次非
            return !!state.userInfo._id
        },
    },
    actions: {
        async login(context, payload) {

            const { data } = await request.get('/login', {
                    params: payload
                })
                // context 相当于store 有相同的属性、方法 通过context来调用mutation中的方法将登陆信息写入本地存储
            context.commit('login', data.data)
                // 在actions不编写业务逻辑代码  只负责获取异步操作返回的数据 并将数据返回到操作业务逻辑的代码中
            return data
        }
    }

}
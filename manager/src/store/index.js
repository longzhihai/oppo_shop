import Vue from 'vue';
import Vuex from 'vuex';
import request from '../utils/request'
import router from '../router';
import authRoutes from '../router/authRoutes';
import { updateStorage } from '@/utils'



let userInfo = localStorage.getItem('userInfo'); // null
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {}
}

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo,
        addedRoute: false, // 是否已经动态添加路由
    },
    getters: {
        isLogin(state) {
            return !!state.userInfo._id
        }
    },
    mutations: {
        login(state, payload) {
            state.userInfo = payload[0];
            updateStorage('userInfo', state.userInfo)
        },
        logout(state) {
            state.userInfo = {};
            updateStorage('userInfo');
        },

        addRoute(state) {
            if (!state.addedRoute) {
                router.addRoute(authRoutes);
                state.addedRoute = true;
            }
        },
        removeRoute(state) {
            console.log('removeRoute')
            router.addRoute({
                path: '/manage',
                name: 'Manage',
                children: []
            })
        }
    },
    actions: {
        async login(ctx, payload) {
            console.log(77, payload);
            const { username, password } = payload
            const {
                data
            } = await request.get("/login/user_vip", {
                params: {
                    username,
                    password
                }
            });

            console.log(22, data);
            if (data.code === 200) {
                // 更新userInfo
                ctx.commit("login", data.data);

                // 动态添加路由
                ctx.commit('addRoute');
            }

            //   把请求回来的数据返回组件（组件需要页面业务逻辑操作）
            return data;
        },
        logout(ctx) {
            ctx.commit('logout')
            ctx.commit('removeRoute')
        }
    }
});

// 刷新重新动态添加路由
// 判断用户是否处在登录状态
if (store.getters.isLogin) {
    store.commit('addRoute');
}

export default store;
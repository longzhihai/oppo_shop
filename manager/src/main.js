import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import request from "./utils/request"

import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vant from 'vant'
import 'vant/lib/index.css'

Vue.use(elementui)
Vue.use(vant)

Vue.prototype.$request = request;
Vue.config.productionTip = false

// 全局路由守卫
// router.beforeEach(function(to, from, next) {
//     // console.log('beforeEach');
//     // 访问后台页面都需要用户登录才能访问
//     if (to.path.startsWith('/manage')) {
//         // 判断是否登录
//         if (store.getters.isLogin) {
//             // 假设所有的用户都是好人,先放行，后校验
//             // 如果用户已登录，则校验用户身份
//             // router.app.$request.get('/user/verify', {
//             //     params: {
//             //         username: store.state.userInfo.username
//             //     }
//             // }).then(({ data }) => {
//             //     if (data.code === 401) {
//             //         store.dispatch('logout')
//             //         router.push({
//             //             path: '/login',
//             //             query: {
//             //                 // 用户访问的目标页面
//             //                 targetUrl: to.fullPath
//             //             }
//             //         })
//             //     }
//             // })
//             next()
//         } else {
//             router.push({
//                 path: '/login',
//                 query: {
//                     // 用户访问的目标页面
//                     targetUrl: to.fullPath
//                 }
//             })
//         }
//     } else {

//         next();
//     }
// })

new Vue({
    router: router,
    store: store,
    render: h => h(App),
}).$mount('#app')
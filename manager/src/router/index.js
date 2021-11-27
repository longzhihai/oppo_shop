import Vue from 'vue'
// 1. 安装vue-router
// 2. 引入vue-router
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

// 3. 安装路由插件
Vue.use(VueRouter)
    // 4. 实例化路由，并配置参数
const router = new VueRouter({
    routes: [{
            path: '/',
            // 路由重定向
            redirect: '/login',
            // redirect: { name: 'Home' }
        },

        // 第一层路由：显示在App.vue中的<router-view />中
        {
            path: '/login',
            component: Login,
        },
    ],

    // 保持滚动条位置
    scrollBehavior(to, from, savePosition) {
        // savePosition: 当前页面滚动条位置，格式：{x,y}
        // return {x:0,y:100}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve({x:0,y:100})
                if (!savePosition) {
                    savePosition = {}
                }
                savePosition.behavior = 'smooth',
                    resolve(savePosition)
            }, 500)
        })
    }

})

console.log('router', router);



export default router;
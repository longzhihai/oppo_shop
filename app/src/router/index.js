import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入相关路由
import Home from '../views/home.vue'
import Reg from '../views/reg.vue'
import Login from '../views/login.vue'
import cart from '../views/cart.vue'
import mine from '../views/mine.vue'
import search from '../views/search.vue'
import discover from '../views/discover.vue'
import goods from '../views/goods.vue'
import submit from '../views/submit.vue'
import adress from '../views/new_adress.vue'
import payoff from '../views/payoff.vue'
import notFound from '../views/notFound.vue'
import searchresult from '../views/searchresult.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    // 基础路由
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/reg', component: Reg },
        { path: '/login', component: Login },
        { path: '/cart', component: cart, meta: { requireAuth: true } },
        { path: '/mine', component: mine, meta: { requireAuth: true } },
        { path: '/search', component: search },
        { path: '/discover', component: discover },
        { path: '/goods/:id', component: goods, name: 'goods' },
        { path: '/notFound', component: notFound },
        { path: '/submit/:id', component: submit },
        { path: '/adress', component: adress },
        { path: '/searchresult', component: searchresult },
        { path: '/payoff/:amount', component: payoff },
        { path: '*', redirect: '/notFound' }
    ]
})

router.beforeEach(function(to, from, next) {
    if (to.meta.requireAuth) {
        let userInfo = localStorage.getItem('userInfo')
        try {
            userInfo = JSON.parse(userInfo) || {}
        } catch (err) {
            userInfo = {}
        }
        if (userInfo._id) {
            next()
        } else {
            router.push({
                path: '/login',
                query: {
                    targetUrl: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})


// if (userInfo._id) {
//     console.log(to.fullPath);
//     router.app.$request.get('/login', {
//         params: {
//             username: userInfo.username
//         },

//     }).then(({ data }) => {
//         if (data.code === 401) {
//             localStorage.removeItem('userInfo')
//             router.push({
//                 path: '/login',
//                 query: {
//                     targetUrl: to.fullPath
//                 }
//             })
//         }
//     })
//     next()
// } else {
//     router.push({
//         path: '/login',
//         query: {
//             targetUrl: to.fullPath
//         }
//     })
// }
export default router
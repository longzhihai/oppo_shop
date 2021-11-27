import Manage from '@/views/Manage.vue'

import Home from '@/views/manage/Home.vue'

import User from '@/views/manage/user/Default.vue'
import UserList from '@/views/manage/user/List.vue'
import UserAdd from '@/views/manage/user/Add.vue'
import UserEdit from '@/views/manage/user/Edit.vue'

import Goods from '@/views/manage/goods/Default.vue'
import GoodsList from '@/views/manage/goods/List.vue'
import GoodsAdd from '@/views/manage/goods/Add.vue'
import GoodsEdit from '@/views/manage/goods/Edit.vue'

import orderList from '../views/manage/order/list.vue'
export default {
    path: '/manage',
    name: 'Manage',
    component: Manage,

    // 子路由（嵌套路由）
    children: [
        // 当浏览器地址匹配 /manage/home 时， 在Manage中的<router-view/>中渲染Home组件
        {
            path: 'home',
            component: Home,
        },
        // 用户
        {
            path: 'user',
            component: User,
            children: [{
                    path: 'list',
                    component: UserList,
                },
                {
                    path: 'add',
                    component: UserAdd,
                },
                {
                    path: 'edit/:id',
                    name: 'UserEdit',
                    component: UserEdit,
                },
            ]
        },
        // 商品
        {
            path: 'goods',
            component: Goods,
            children: [{
                    path: 'list',
                    component: GoodsList,
                },
                {
                    path: 'add',
                    component: GoodsAdd,
                },
                {
                    path: 'edit/:id',
                    component: GoodsEdit,
                },
            ]
        },
        // 订单
        {
            path: 'order/list',
            component: orderList,
        }

    ]
}

// router.addRoute('Manage',{
//     path:'user',
//     component:User
// })
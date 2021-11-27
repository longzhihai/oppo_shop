import { updateStroage } from '@/utils'
// import { request } from 'express';
// import request from '../utils/requset'

let cartlist = localStorage.getItem('cartlist'); // null
try {
    cartlist = JSON.parse(cartlist) || [];
} catch (err) {
    cartlist = []
}

let submitList = localStorage.getItem('submitList'); // null
try {
    submitList = JSON.parse(submitList) || [];
} catch (err) {
    submitList = []
}

export default {
    namespaced: true,

    state: {
        cartlist,
        submitList
    },
    mutations: {
        // 增加一种商品
        add(state, payload) {
            console.log('种类+1');
            state.cartlist.unshift(payload)
                // 写入本地存储  实现数据持久化
            updateStroage('cartlist', state.cartlist)
        },
        // 修改商品的数量
        changeQty(state, {
            id,
            qty
        }) {
            console.log('数量+1', qty);
            console.log(state.cartlist);
            state.cartlist.forEach(item => {
                if (item.id === id) {
                    item.qty = qty
                }
            })

            updateStroage('cartlist', state.cartlist)
        },
        // 移除单个或多个商品
        remove(state, {
            id
        }) {
            // 判断删除单个商品还是多个商品  是否为数组
            if (!Array.isArray(id)) {
                id = [id]
            }
            state.cartlist = state.cartlist.filter(item => {
                return item.id != id
            })
            updateStroage('cartlist', state.cartlist)

        },
    },
    getters: {
        totalPrice(state) {
            // return state.cartlist.reduce((val, item) => val + item.price * item.qty, 0)
            let total = 0;
            state.cartlist.forEach(item => {
                if (state.selectIds.includes(item.id)) {
                    total += item.price * item.qty
                }
            })
            return total * 100
        },

    },
    actions: {

    }

}
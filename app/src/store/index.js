import Vue from "vue";
import Vuex from "vuex";
import cart from './cart'
import user from './user'
Vue.use(Vuex)

const store = new Vuex.Store({
    // 全局状态 data
    state: {
        index: 100,
        a: 99
    },
    // computed 计算属性
    getters: {

    },
    // methods
    mutations: {



    },
    // 用于异步操作的mutations 异步操作写在actions中
    actions: {

    },
    // vuex模块化
    modules: {
        cart,
        user
    }
})

export default store
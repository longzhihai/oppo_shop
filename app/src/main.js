import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'

import request from './utils/request.js'

Vue.prototype.$request = request

Vue.use(vant)

Vue.config.productionTip = false

new Vue({
    store: store,
    router: router,
    render: h => h(App),
}).$mount('#app')
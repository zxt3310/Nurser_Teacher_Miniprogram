import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'

import store from './store'

Vue.prototype.$store = store;
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()

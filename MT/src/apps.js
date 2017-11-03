// entry
import Vue from 'vue'
import router from '@/router'
import App from './App'

import EventBus from '@/common/bus'
import * as filters from './filters' // 全局filter
import '@/mock'

// lib
import Mint from 'mint-ui'
Vue.use(Mint)

Vue.prototype.$bus = EventBus

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

if (process.env.NODE_ENV === 'development') {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = false
  Vue.config.productionTip = false
}

if (process.env.NODE_ENV === 'production') {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}

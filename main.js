import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
//引入uView-ui
import uView from 'uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'
import store from './store' //  引入 store


import {
  rpxToPx,
  pxToRpx
} from './utils/unit.js' // 引入工具函数
// 将函数挂载到全局
Vue.prototype.$rpxToPx = rpxToPx;
Vue.prototype.$pxToRpx = pxToRpx;

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
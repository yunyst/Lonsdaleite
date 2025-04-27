import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// //准备state对象——保存具体的数据
// const state = {}
// //准备mutations对象——修改state中的数据
// const mutations = {}
// //准备actions对象——响应组件中用户的动作
// const actions = {}
// //准备getters:理解为计算属性，用于简化仓库数据
// const getters = {}

import home from './home/index.js'
import cleaning from './cleaning/cleaning.js'
import productDetail from './productDetail/productDetail.js'
import login from './login/login.js'
import navigation from './navigation/navigation.js'
import userCenter from './userCenter/userCenter.js'
import userInfo from './userInfo/userInfo.js'
export default new Vuex.Store({
  modules: {
    home,
    cleaning,
    productDetail,
    login,
    navigation,
    userCenter,
    userInfo
  },
  strict: process.env.NODE_ENV !== 'production' // 开发环境严格模式
})
const state = {
  validEmails: ["gmail.com", "qq.com", "outlook.com", "163.com", "sina.com"],
  showLoginModal: true,
  isLogin: false,
  userInfo: null,
  // token: uni.getStorageSync('token') || null, // 初始化时从本地存储中获取 token
  loginTrigger: null // 记录触发登录的来源场景: 'tab' | 'detail'
}
const mutations = {
  TOGGLE_LOGIN_MODAL(state, payload) {
    state.showLoginModal = payload;
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload
  },
  SET_LOGIN_TRIGGER(state, source) {
    state.loginTrigger = source;
  },
  // SET_TOKEN(state, token) {
  //   state.token = token;
  //   uni.setStorageSync('token', token); // 将 token 存储到本地
  //   //本地存储token
  //   // 后续请求携带Token
  //   // uni.request({  //访问外部HTTP API
  //   //   url: '...',
  //   //   header: {
  //   //     'Authorization': 'Bearer ' + uni.getStorageSync('token')
  //   //   }
  //   // });
  // }
}
const actions = {
  // 触发登录弹窗时记录来源
  openLoginModal({
    commit
  }, source) {
    commit('SET_LOGIN_TRIGGER', source);
    // if()
    commit('TOGGLE_LOGIN_MODAL', true);
  },
  // 关闭登录弹窗
  closeLoginModal({
    commit
  }) {
    commit('TOGGLE_LOGIN_MODAL', false)
  },
  // 用户注册登录逻辑
  async submitLogin({
    commit
  }, payload) {
    try {
      const funcName = payload.isRegister ? 'userRegister' : 'userLogin'
      const userInfo = await uniCloud.callFunction({
        name: funcName,
        data: payload
      })
      // console.log("userInfo", userInfo)
      if (userInfo.result.code == '200') {
        // const token = res.result.data.token; // 确保云函数返回了token
        const userData = payload.isRegister ? payload.account : res.result.data.userInfo;

        // commit('SET_TOKEN', token);
        commit('SET_USER_INFO', userData)
        commit('TOGGLE_LOGIN_MODAL', false)

        uni.showToast({
          title: payload.isRegister ? '注册成功' : '登录成功',
          icon: 'none'
        })

        return {
          success: true,
          token
        }
      } else {
        // 云函数返回的业务错误（如账号已存在/密码错误等）
        // console.log("云函数返回的业务错误（如账号已存在/密码错误等）")
        uni.showToast({
          title: userInfo.result.message || '操作失败',
          icon: 'none'
        })
        return {
          success: false
        }
      }
    } catch {
      // 网络请求或系统级错误
      uni.showToast({
        title: payload.isRegister ? "注册失败" : '登录失败',
        icon: 'none'
      })
      return {
        success: false
      }
    }

  },

  // 验证 token 是否有效

}


const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
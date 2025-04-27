const state = {
  validEmails: ["gmail.com", "qq.com", "outlook.com", "163.com", "sina.com"],
  showLoginModal: true,
  isLogin: false,
  userInfo: null, //（user.account）
  token: uni.getStorageSync('token') || null, // 初始化时从本地存储中获取 token
  loginTrigger: null, // 记录触发登录的来源场景: 'tab' | 'detail'
  userId: null
}
const mutations = {
  TOGGLE_LOGIN_MODAL(state, payload) {
    //显示/隐藏登录
    state.showLoginModal = payload;
  },
  SET_USER_INFO(state, payload) {
    //设置用户信息
    state.userInfo = payload
  },
  SET_LOGIN_TRIGGER(state, source) {
    // 设置登录来源
    state.loginTrigger = source;
  },
  SET_TOKEN(state, {
    token,
    uid,
    expires
  }) {
    uni.setStorageSync('token', token); // 将 token 存储到本地
    state.token = token;
    state.userId = uid;

    // 结构化存储
    uni.setStorageSync('auth_data', {
      token,
      uid,
      expires: expires || Date.now() + 7 * 24 * 60 * 60 * 1000 // 默认7天过期
    });
  },
  SET_NEW_TOKEN(state, newToken) {
    state.token = newToken;
    uni.setStorageSync('auth_data', {
      token,
      uid: state.userInfo,
      expires: expires || Date.now() + 7 * 24 * 60 * 60 * 1000 // 默认7天过期
    });
  }
}
const actions = {
  // 触发登录弹窗时记录来源
  openLoginModal({
    commit
  }, source) {
    commit('SET_LOGIN_TRIGGER', source);
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
        const token = userInfo.result.data.token; // 确保云函数返回了token
        const userData = payload.isRegister ? payload.account : userInfo.result.data.userInfo;
        console.log("SET_TOKEN-actions", userInfo.result.data)
        commit('SET_TOKEN', {
          token: userInfo.result.data.token,
          uid: userInfo.result.data.userInfo,
          expires: userInfo.result.data.expiresIn
        })

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
    } catch (error) {
      // 网络请求或系统级错误
      console.log('登录失败', error)
      uni.showToast({
        title: payload.isRegister ? "注册失败" : '登录失败',
        icon: 'none'
      })
      return {
        success: false
      }
    }

  }
}


const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
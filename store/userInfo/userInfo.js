export default {
  state: {
    userInfo: null,
    permissions: [],
    pending: false
  },
  mutations: {
    SET_USER(state, payload) {
      state.userInfo = payload.userInfo;
      state.permissions = payload.permissions || [];
      console.log("payload", state.userInfo, state.permissions)
      // 同步到Storage
      uni.setStorageSync('userPermissions', payload.permissions || []);
    },
    SET_PENDING(state, value) {
      state.pending = value;
    }
  },
  actions: {
    async fetchUser({
      commit
    }, {
      account,
      smartCloud
    }) {
      commit('SET_PENDING', true);
      try {
        const res = await smartCloud('getUserInfo', {
          account
        }, {
          loadingText: "数据加载中...",
          cacheExpire: 600, //s
          retryTimes: 2, // 失败后最多重试2次
          retryDelay: 500 // 每次重试间隔500ms
        });
        commit('SET_USER', res);
      } catch (err) {
        console.log(err)
        this.error = '网络请求失败，请稍后重试';
      } finally {
        commit('SET_PENDING', false);
      }

    }
  },
  getters: {}
};
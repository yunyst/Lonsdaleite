const state = {
  lastTabBarIndex: 0 // 记录上次停留的tabBar索引
}
const mutations = {
  UPDATE_LAST_TAB(state, index) {
    state.lastTabBarIndex = index;
    console.log("lastTabBarIndex", index)
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
//准备state对象——保存具体的数据
const state = {
  activeCategory: 'cleaning'
}
//准备mutations对象——修改state中的数据
const mutations = {
  SET_ACTIVE_CATEGORY(state, category) {
    state.activeCategory = category
  }
}
//准备actions对象——响应组件中用户的动作
const actions = {
  updateCategory({
    commit
  }, category) {
    commit('SET_ACTIVE_CATEGORY', category)
  }
}
//准备getters:理解为计算属性，用于简化仓库数据
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}
//准备state对象——保存具体的数据
const state = {
  //分段器
  list: [{
    name: "商品"
  }, {
    name: "品牌"
  }, {
    name: "详情"
  }, {
    name: "推荐"
  }]
}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备actions对象——响应组件中用户的动作
const actions = {}
//准备getters:理解为计算属性，用于简化仓库数据
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
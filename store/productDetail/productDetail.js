//准备state对象——保存具体的数据
const state = {
  //分段器
  list: [{
    name: "商品",
    ref: "product"
  }, {
    name: "品牌",
    ref: "brand"
  }, {
    name: "详情",
    ref: "detail"
  }, {
    name: "推荐",
    ref: "recommend"
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
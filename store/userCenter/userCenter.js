//准备state对象——保存具体的数据
const state = {
  infoList: [{
    count: 1,
    title: '优惠劵'
  }, {
    count: 23,
    title: '积分'
  }, {
    count: 1,
    title: '等级'
  }, {
    count: 1,
    title: '权益'
  }],
  noticeBarList: ["任意消费即可领取会员专属福利", "加入Lonsdaleite粉丝群领取专属福利", "获取积分兑换人气好物"],
  orderList: [{
    icon: 'shopping-cart',
    title: '待支付'
  }, {
    icon: 'email',
    title: '待发货'
  }, {
    icon: 'car',
    title: '已发货'
  }, {
    icon: 'edit-pen',
    title: '待评价'
  }, {
    icon: 'calendar',
    title: '售后服务'
  }]
}
const mutations = {

}
const actions = {

}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}
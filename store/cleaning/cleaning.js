//准备state对象——保存具体的数据
const state = {
  // 分类图标
  iconList: [{
      img: 'https://lonsdaleite.oss-cn-beijing.aliyuncs.com/icons/featured/sale.png',
      title: '每日热卖'
    },
    {
      img: 'https://lonsdaleite.oss-cn-beijing.aliyuncs.com/icons/featured/new-fill-2.png',
      title: '畅销榜单'
    },
    {
      img: 'https://lonsdaleite.oss-cn-beijing.aliyuncs.com/icons/featured/hot.png',
      title: '人气精选'
    },
    {
      img: 'https://lonsdaleite.oss-cn-beijing.aliyuncs.com/icons/featured/First%20Position%20Badge.png',
      title: '新品试用'
    },
    {
      img: 'https://lonsdaleite.oss-cn-beijing.aliyuncs.com/icons/featured/woman.png',
      title: '美妆服务'
    }
  ],
  // 五大板块
  sections: [],
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
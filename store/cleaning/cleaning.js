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
  sections: [{
      title: '人气畅销',
      products: [{
          only: true,
          new: true,
          brand: 'sk2',
          img: 'https://dummyimage.com/200x200/eee/333&text=SK-II',
          name: 'SK-II 神仙水 230ml',
          price: 2100
        },
        {
          only: true,
          brand: 'LANCOME',
          img: 'https://dummyimage.com/200x200/ccc/333&text=LANCOME',
          name: 'LANCOME 小黑瓶 100ml',
          price: 500
        },
        {
          only: false,
          brand: 'SHISEIDO',
          img: 'https://dummyimage.com/200x200/bbb/333&text=SHISEIDO',
          name: 'SHISEIDO 资生堂 红腰子精华 50ml',
          price: 760
        }
      ]
    },
    {
      title: '新品速递',
      products: [{
          brand: 'DIOR',
          img: 'https://dummyimage.com/200x200/f0f0f0/333&text=DIOR',
          new: true,
          name: 'DIOR 花秘面霜 60ml',
          price: 900
        },
        {
          brand: '赫莲娜',
          new: true,
          img: 'https://dummyimage.com/200x200/e0e0e0/333&text=HR',
          name: '赫莲娜 绿宝瓶精华 50ml',
          price: 1280
        },
        {
          brand: '赫莲娜',
          new: true,
          img: 'https://dummyimage.com/200x200/e0e0e0/333&text=HR',
          name: '赫莲娜 绿宝瓶精华 50ml',
          price: 1280
        },
        {
          brand: '赫莲娜',
          new: true,
          img: 'https://dummyimage.com/200x200/e0e0e0/333&text=HR',
          name: '赫莲娜 绿宝瓶精华 50ml',
          price: 1280
        },
        {
          brand: '赫莲娜',
          new: true,
          img: 'https://dummyimage.com/200x200/e0e0e0/333&text=HR',
          name: '赫莲娜 绿宝瓶精华 50ml',
          price: 1280
        }
      ]
    },
    {
      title: '玩妆课堂',
      products: [{
          brand: 'MAC',
          img: 'https://dummyimage.com/200x200/aaa/333&text=MAC',
          name: 'MAC 口红 Chili',
          price: 170
        },
        {
          brand: 'ARMANI',
          img: 'https://dummyimage.com/200x200/ddd/333&text=ARMANI',
          name: 'ARMANI 红管唇釉 #405',
          price: 320
        }
      ]
    },
    {
      title: '净卸妆容',
      products: [{
          brand: 'BIODERMA',
          img: 'https://dummyimage.com/200x200/eee/333&text=BIODERMA',
          name: 'BIODERMA 舒妍卸妆水 500ml',
          price: 128
        },
        {
          brand: 'FANCL',
          img: 'https://dummyimage.com/200x200/ccc/333&text=FANCL',
          name: 'FANCL 卸妆油 120ml',
          price: 198
        }
      ]
    },
    {
      title: '全球趋势',
      products: [{
          brand: 'LA MER',
          img: 'https://dummyimage.com/200x200/aaa/333&text=LA+MER',
          name: 'LA MER 精华面霜 60ml',
          price: 1850
        },
        {
          brand: 'CPB',
          img: 'https://dummyimage.com/200x200/999/333&text=CPB',
          name: 'CPB 精华肌底液 40ml',
          price: 980
        }
      ]
    }
  ],
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
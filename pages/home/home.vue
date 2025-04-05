<template>
  <view class="home-container">
    <!-- 1. 顶部分类栏 -->
    <!-- <view class="tab-bar">
      <scroll-view scroll-x class="tab-scroll" :scroll-into-view="activeCategory" :scroll-with-animation="true">
        <view v-for="(item, index) in categoryTabs" :key="index" class="tab-item"
          :class="{ active: activeCategory === item.value }" @click="onCategoryClick(item.value)">
          {{ item.label }}
        </view>
      </scroll-view>
    </view> -->
    <HomeTabBar :categoryTabs="categoryTabs" @tab-change="onTabChange" />

    <!-- 2. Banner 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="banner in bannerList" :key="banner.id">
        <image :src="banner.image" class="swiper-image" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>


    <!-- 3. 分类图标 -->
    <view class="icon-grid">
      <view v-for="(icon, index) in iconList" :key="index" class="icon-item">
        <image :src="icon.img" class="icon-img" mode="widthFix"></image>
        <text class="icon-title">{{ icon.title }}</text>
      </view>
    </view>

    <!-- 4. 五大板块 -->
    <view class="section-wrap" v-for="(section, sIndex) in sections" :key="sIndex">
      <!-- 板块标题 -->
      <view class="section-title">{{ section.title }}</view>
      <!-- 板块内容 - 商品列表 -->
      <scroll-view scroll-x="true" class="product-scroll">
        <view class="product_scroll-child">
          <view v-for="(product, pIndex) in section.products" :key="pIndex">
            <ProductCard :product="product" @goProductDetail="goProductDetail" />
          </view>
        </view>

      </scroll-view>
    </view>


    <!-- 5. 全部商品（下拉加载/上拉加载） -->
    <view class="product-grid">
      <view class="all-goods-title">全部商品</view>
      <!-- grid -->
      <!-- <view class="goods-grid">
        <view class="goods-card" v-for="good in allGoods" :key="good.id">
          <AllGoodsCard :good="good" @goProductDetail="goProductDetail"></AllGoodsCard>
        </view>
      </view> -->
      <!-- 使用瀑布流布局 -->
      <view class="goods-grid">
        <view class="goods-column" v-for="(column, cIndex) in columns" :key="cIndex">
          <view class="goods-card" v-for="(good, gIndex) in column" :key="good.id">
            <AllGoodsCard :good="good" @goProductDetail="goProductDetail"></AllGoodsCard>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
      <u-load-more :status="loadMoreStatus" @load-more="loadMoreGoods"></u-load-more>
    </view>
  </view>
</template>

<script>
  import ProductCard from '../../components/ProductCard/ProductCard';
  import AllGoodsCard from '../../components/AllGoodsCard/AllGoodsCard';
  import HomeTabBar from '../../components/HomeTabBar/HomeTabBar';
  export default {
    components: {
      ProductCard,
      AllGoodsCard,
      HomeTabBar
    },
    data() {
      return {
        // 当前选中的分类
        activeCategory: 'cleaning',
        isLoading: false,
        bannerList: [],
        // 分类栏
        categoryTabs: [{
            label: '精选',
            value: 'cleaning'
          },
          {
            label: '彩妆',
            value: 'makeup'
          },
          {
            label: '护肤',
            value: 'skincare'
          },
          {
            label: '香水',
            value: 'fragrance'
          },
          {
            label: '身体洗护',
            value: 'bodycare'
          },
          {
            label: '男士',
            value: 'male'
          }
        ],
        // 分类图标
        iconList: [{
            img: 'http://su3fi9c95.hd-bkt.clouddn.com/icons/home/classify/sale.png',
            title: '每日热卖'
          },
          {
            img: 'http://su3fi9c95.hd-bkt.clouddn.com/icons/home/classify/First%20Position%20Badge.png',
            title: '畅销榜单'
          },
          {
            img: 'http://su3fi9c95.hd-bkt.clouddn.com/icons/home/classify/new.png',
            title: '人气精选'
          },
          {
            img: 'http://su3fi9c95.hd-bkt.clouddn.com/icons/home/classify/new-fill.png',
            title: '新品试用'
          },
          {
            img: 'http://su3fi9c95.hd-bkt.clouddn.com/icons/home/classify/woman.png',
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
        // 全部商品（下拉加载或上拉加载）
        allGoods: [{
            brand: 'CPB',
            img: 'https://dummyimage.com/200x200/eee/333&text=ITEM1',
            name: '商品1',
            price: 200
          },
          {
            brand: 'CPB',
            img: 'https://dummyimage.com/200x200/ccc/333&text=ITEM2',
            name: '商品2',
            price: 350
          },
          {
            brand: 'CPB',
            new: true,
            img: 'https://dummyimage.com/200x200/bbb/333&text=ITEM3',
            name: '商品3',
            price: 600
          }, {
            brand: 'SK-II',
            img: 'https://dummyimage.com/200x200/eee/333&text=SK-II',
            name: 'SK-II 神仙水 230ml',
            price: 2100
          },
          {
            brand: 'LANCOME',
            img: 'https://dummyimage.com/200x200/ccc/333&text=LANCOME',
            name: 'LANCOME 小黑瓶 100ml',
            price: 500
          },
          {
            brand: 'SHISEIDO',
            new: true,
            img: 'https://dummyimage.com/200x200/bbb/333&text=SHISEIDO',
            name: 'SHISEIDO 资生堂 红腰子精华 50ml',
            price: 760
          },
          {
            brand: 'SHISEIDO',
            new: true,
            img: 'https://dummyimage.com/200x200/bbb/333&text=SHISEIDO',
            name: 'SHISEIDO 资生堂 红腰子精华 50ml',
            price: 760
          }

        ],
        columns: [
          [],
          []
        ], // 2列
        loadMoreStatus: 'loadmore' // loadmore, loading, nomore
      }
    },
    watch: {
      allGoods: {
        handler(newGoods) {
          this.distributeGoods(newGoods);
        },
        immediate: true
      }
    },
    methods: {
      // 点击分类栏
      onCategoryClick(value) {
        this.activeCategory = value
        // TODO: 可在此根据分类 value 做切换逻辑
      },
      // 前往商品详情
      goProductDetail(product) {
        console.log("子组件传递过来的值：", product);

        // uni.showToast({
        //   title: '查看商品：' + product.name,
        //   icon: 'none'
        // })
        // TODO: uni.navigateTo({ url: '/pages/detail/detail?id=' + product.id })
      },
      // 加载更多商品
      loadMoreGoods() {
        // 模拟加载更多
        this.loadMoreStatus = 'loading'
        setTimeout(() => {
          // 假装拉取了更多数据
          this.allGoods.push({
            img: 'https://dummyimage.com/200x200/ddd/333&text=ITEM4',
            name: '商品4',
            price: 700
          }, {
            img: 'https://dummyimage.com/200x200/ddd/333&text=ITEM5',
            name: '商品5',
            price: 520
          })
          // 更新状态
          this.loadMoreStatus = 'nomore'
        }, 1200)
      },
      distributeGoods(goods) {
        this.columns = [
          [],
          []
        ]; // 清空列
        goods.forEach((item, index) => {
          this.columns[index % 2].push(item); // 交替分配到两列
        });
      },
      // 获取banner数据的方法
      async fetchBanners(pageType = 'cleaning') {
        this.isLoading = true;
        this.error = null;

        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getBanners', // 你的云函数名称
            data: {
              pageType: pageType // 传递参数
            }
          });
          if (result.result.code === 200) {
            this.bannerList = result.result.data || [];
            console.log(this.bannerList)
          } else {
            this.error = result.result.message || '获取数据失败';
          }
        } catch (err) {
          console.error('调用云函数失败:', err);
          this.error = '网络请求失败，请稍后重试';
        } finally {
          this.isLoading = false;
        }
      },
      onTabChange(categoryValue) {
        // 如果点击的分类是 cleaning，则当前页面就是 cleaning，无需跳转
        if (categoryValue === 'cleaning') return;
        // 跳转到对应分类页面，这里用 navigateTo（如果不是 tabBar 页面）
        uni.navigateTo({
          url: `/pages/${categoryValue}/${categoryValue}`
        });
      }
    },
    onLoad() {
      this.fetchBanners(this.activeCategory).then(() => {
        console.log("Banner 数据加载完成:", this.bannerList)
      })
    }
  }
</script>

<style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
  }

  /* 分类栏 */
  .tab-bar {
    background-color: #fff;
    overflow: hidden;
    height: 90rpx;
    display: flex;
    align-items: center;
  }

  .tab-scroll {
    white-space: nowrap;
  }

  .tab-item {
    display: inline-block;
    padding: 0 30rpx;
    line-height: 90rpx;
    font-size: 28rpx;
    color: #333;
  }

  .tab-item.active {
    color: #000000;
    font-weight: bold;
    border-bottom: 2rpx solid #000000;
  }

  /* Banner */

  .swiper {
    width: 100%;
    height: 400rpx;
  }

  .swiper-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 修改 swiper 指示点样式 */
  ::v-deep .wx-swiper-dot {
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255);
  }

  ::v-deep .wx-swiper-dot-active {
    background-color: #ffffff;
    width: 15px;
    height: 5px;
    border-radius: 5px;
  }


  /* 分类图标 */
  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    padding: 10rpx 10rpx;
    margin: 10rpx 20rpx;
    border-radius: 10rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
  }

  .icon-item {
    width: 16%;
    text-align: center;
    margin: 10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon-img {
    width: 60rpx;
    height: 60rpx;
    margin-bottom: 12rpx;
  }

  .icon-title {
    font-size: 20rpx;
    color: #333;
  }

  /* 五大板块 */
  .section-wrap {
    padding: 10rpx;
    margin: 10rpx 20rpx;
  }

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: #333;
    padding-left: 20rpx;
  }

  .product-scroll {
    overflow-x: auto;
    white-space: nowrap;
    /* border: #000000 1px solid; */
  }

  .product_scroll-child {
    display: flex;
    flex-direction: row;
  }

  /* 全部商品 */
  .all-goods-wrap {
    background-color: #fff;
    margin-bottom: 20rpx;
    padding-bottom: 20rpx;
  }

  .all-goods-title {
    font-size: 32rpx;
    font-weight: bold;
    padding: 20rpx;
    color: #333;
  }

  /* .goods-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .goods-card {
    width: 100%;
  } */
  .product-grid {
    padding: 20rpx;
  }

  .goods-grid {
    display: flex;
    justify-content: space-between;
  }

  .goods-column {
    width: 48%;
  }

  .goods-card {
    margin-bottom: 20rpx;
  }
</style>
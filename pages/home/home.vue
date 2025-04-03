<template>
  <view class="home-container">
    <!-- 1. 顶部分类栏 -->
    <view class="tab-bar">
      <scroll-view scroll-x class="tab-scroll" :scroll-into-view="activeCategory" :scroll-with-animation="true">
        <view v-for="(item, index) in categoryTabs" :key="index" class="tab-item"
          :class="{ active: activeCategory === item.value }" @click="onCategoryClick(item.value)">
          {{ item.label }}
        </view>
      </scroll-view>
    </view>

    <!-- 2. Banner 轮播图 -->
    <view class="banner-wrap">
      <u-swiper :list="bannerList" height="400" :indicator-dots="true" autoplay></u-swiper>
    </view>

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
      <scroll-view scroll-x class="product-scroll">
        <ProductCard :products="section.products" @goProductDetail="goProductDetail" />
      </scroll-view>
    </view>


    <!-- 5. 全部商品（下拉加载/上拉加载） -->
    <view class="all-goods-wrap">
      <view class="all-goods-title">全部商品</view>
      <view class="goods-list">
        <!-- <view v-for="(good, index) in allGoods" :key="index" class="goods-item" @click="goProductDetail(good)">
          <image :src="good.img" class="goods-img" mode="widthFix" />
          <view class="goods-info">
            <view class="goods-name">
              <text>{{ good.name }}</text>
            </view>
            <view class="goods-price">
              <text class="goods-price">¥{{ good.price }}</text>
            </view>
          </view>
        </view> -->
        <ProductCard :products="allGoods" @goProductDetail="goProductDetail" />
      </view>
      <!-- 加载更多 -->
      <u-load-more :status="loadMoreStatus" @load-more="loadMoreGoods"></u-load-more>
    </view>
  </view>
</template>

<script>
  import ProductCard from '../../components/ProductCard/ProductCard';
  export default {
    components: {
      ProductCard
    },
    data() {
      return {
        // 当前选中的分类
        activeCategory: 'featured',
        // 分类栏
        categoryTabs: [{
            label: '精选',
            value: 'featured'
          },
          {
            label: 'makeup',
            value: 'makeup'
          },
          {
            label: 'skincare',
            value: 'skincare'
          },
          {
            label: 'fragrance',
            value: 'fragrance'
          },
          {
            label: 'bodycare',
            value: 'bodycare'
          },
          {
            label: 'male',
            value: 'male'
          }
        ],
        // Banner 数据
        bannerList: [{
            url: '',
            img: 'https://dummyimage.com/750x400/eee/333&text=Banner1'
          },
          {
            url: '',
            img: 'https://dummyimage.com/750x400/ccc/333&text=Banner2'
          },
          {
            url: '',
            img: 'https://dummyimage.com/750x400/bbb/333&text=Banner3'
          }
        ],
        // 分类图标
        iconList: [{
            img: 'https://dummyimage.com/100x100/eee/333&text=Icon1',
            title: '热卖'
          },
          {
            img: 'https://dummyimage.com/100x100/ccc/333&text=Icon2',
            title: '大牌'
          },
          {
            img: 'https://dummyimage.com/100x100/aaa/333&text=Icon3',
            title: '折扣'
          },
          {
            img: 'https://dummyimage.com/100x100/f5f5f5/333&text=Icon4',
            title: '限量'
          },
          {
            img: 'https://dummyimage.com/100x100/f0f0f0/333&text=Icon5',
            title: '优惠'
          },
          {
            img: 'https://dummyimage.com/100x100/e0e0e0/333&text=Icon6',
            title: '礼品'
          }
        ],
        // 五大板块
        sections: [{
            title: '人气畅销',
            products: [{
                img: 'https://dummyimage.com/200x200/eee/333&text=SK-II',
                name: 'SK-II 神仙水 230ml',
                price: 2100
              },
              {
                img: 'https://dummyimage.com/200x200/ccc/333&text=LANCOME',
                name: 'LANCOME 小黑瓶 100ml',
                price: 500
              },
              {
                img: 'https://dummyimage.com/200x200/bbb/333&text=SHISEIDO',
                name: 'SHISEIDO 资生堂 红腰子精华 50ml',
                price: 760
              }
            ]
          },
          {
            title: '新品速递',
            products: [{
                img: 'https://dummyimage.com/200x200/f0f0f0/333&text=DIOR',
                new: true,
                name: 'DIOR 花秘面霜 60ml',
                price: 900
              },
              {
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
                img: 'https://dummyimage.com/200x200/aaa/333&text=MAC',
                name: 'MAC 口红 Chili',
                price: 170
              },
              {
                img: 'https://dummyimage.com/200x200/ddd/333&text=ARMANI',
                name: 'ARMANI 红管唇釉 #405',
                price: 320
              }
            ]
          },
          {
            title: '净卸妆容',
            products: [{
                img: 'https://dummyimage.com/200x200/eee/333&text=BIODERMA',
                name: 'BIODERMA 舒妍卸妆水 500ml',
                price: 128
              },
              {
                img: 'https://dummyimage.com/200x200/ccc/333&text=FANCL',
                name: 'FANCL 卸妆油 120ml',
                price: 198
              }
            ]
          },
          {
            title: '全球趋势',
            products: [{
                img: 'https://dummyimage.com/200x200/aaa/333&text=LA+MER',
                name: 'LA MER 精华面霜 60ml',
                price: 1850
              },
              {
                img: 'https://dummyimage.com/200x200/999/333&text=CPB',
                name: 'CPB 精华肌底液 40ml',
                price: 980
              }
            ]
          }
        ],
        // 全部商品（下拉加载或上拉加载）
        allGoods: [{
            img: 'https://dummyimage.com/200x200/eee/333&text=ITEM1',
            name: '商品1',
            price: 200
          },
          {
            img: 'https://dummyimage.com/200x200/ccc/333&text=ITEM2',
            name: '商品2',
            price: 350
          },
          {
            img: 'https://dummyimage.com/200x200/bbb/333&text=ITEM3',
            name: '商品3',
            price: 600
          }
        ],
        loadMoreStatus: 'loadmore' // loadmore, loading, nomore
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
      }
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
  .banner-wrap {
    width: 100%;
    height: auto;
    margin-bottom: 20rpx;
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
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 8rpx;
  }

  .icon-title {
    font-size: 20rpx;
    color: #333;
  }

  /* 五大板块 */
  .section-wrap {
    margin-bottom: 20rpx;
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
    white-space: nowrap;
    display: flex;
    overflow-x: auto;
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

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20rpx;
  }

  .goods-item {
    width: 50%;
    box-sizing: border-box;
    padding: 10rpx;
  }

  .goods-img {
    width: 100%;
    height: 300rpx;
    border-radius: 10rpx;
    margin-bottom: 10rpx;
  }

  .goods-info {
    text-align: left;
  }

  .goods-name {
    font-size: 24rpx;
    color: #333;
    line-height: 32rpx;
  }

  .goods-price {
    font-size: 26rpx;
    color: #e6232e;
    margin-top: 4rpx;
  }
</style>
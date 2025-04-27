<template>
  <view>
    <view class="product-grid">
      <view class="all-goods-title">全部商品</view>
      <!-- grid -->
      <!-- <view class="goods-grid">
        <view class="goods-card" v-for="good in allGoods" :key="good.id">
          <AllGoodsCard :good="good" @goProductDetail="goProductDetail"></AllGoodsCard>
        </view>
      </view> -->

      <!-- 瀑布流容器 -->
      <scroll-view scroll-y class="goods-scroll" @scrolltolower="handleScrollToLower" :scroll-with-animation="true">
        <view class="goods-grid">
          <view class="goods-column" v-for="(column, cIndex) in columns" :key="cIndex">
            <view class="goods-card" v-for="good in column" :key="good.id">
              <AllGoodsCard :good="good" @goProductDetail="goProductDetail" />
            </view>
          </view>
        </view>

        <!-- 底部加载状态提示 -->
        <view class="loading-footer" style="font-size: 20rpx; display: flex; justify-content: center;">
          <text v-if="loading">加载中...</text>
          <text v-else-if="!hasMore">没有更多了</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import AllGoodsCard from '../../components/AllGoodsCard/AllGoodsCard';
  export default {
    name: "AllProduct",
    components: {
      AllGoodsCard
    },
    computed: {
      ...mapState({
        activeCategory: state => state.home.activeCategory
      })
    },
    data() {
      return {
        // 全部商品（下拉加载或上拉加载）
        allGoods: [],
        columns: [
          [],
          []
        ], // 2列
        //loadmore
        skip: 0,
        limit: 20,
        loading: false, //goods loading
        hasMore: true,
        scrollTimer: null
      };
    },
    watch: {
      allGoods: {
        handler(newGoods) {
          this.distributeGoods(newGoods);
        },
        immediate: true
      },
      activeCategory() {
        this.resetList();
        this.loadMoreGoods();
      }
    },
    methods: {
      // 前往商品详情
      goProductDetail(product) {
        console.log("子组件传递过来的值：", product);
        uni.navigateTo({
          url: `/pages/productDetail/productDetail?productId=${product.product_id}`
        })
      },
      // 重置列表数据
      resetList() {
        this.allGoods = [];
        this.columns = [
          [],
          []
        ];
        this.skip = 0;
        this.hasMore = true;
      },
      //实现瀑布流
      distributeGoods(goods) {
        this.columns = [
          [],
          []
        ]; // 清空列
        goods.forEach((item, index) => {
          this.columns[index % 2].push(item); // 交替分配到两列
        })
      }, // 滚动到底部触发
      handleScrollToLower() {
        if (this.loading || !this.hasMore) return;
        // 防抖处理
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
          this.loadMoreGoods();
        }, 300);
      },
      //获取商品卡片详情 调用云函数请求全部商品信息
      async loadMoreGoods() {
        if (this.loading || !this.hasMore) return;
        this.loading = true;
        // this.loadMoreStatus = "loading";

        try {
          const res = await uniCloud.callFunction({
            name: 'getProductCardInfo',
            data: {
              pageType: this.activeCategory,
              skip: this.skip,
              limit: this.limit
            }
          });

          const newProducts = res.result.data || [];
          this.allGoods = [...this.allGoods, ...newProducts];
          this.skip += newProducts.length;
          this.hasMore = newProducts.length >= this.limit;

        } catch (err) {
          console.error('加载更多失败:', err);
          uni.showToast({
            title: '加载失败',
            icon: 'none'
          });
        } finally {
          this.loading = false;
        }
      }

    },
    mounted() {
      this.loadMoreGoods().then(() => {
        // console.log("allGoods 数据加载完成", this.allGoods)
      }).catch(() => {
        console.log("失败")
      })
    }
  }
</script>

<style scoped>
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

  .goods-scroll {
    height: calc(100vh - 120rpx);
    /* 根据实际布局调整 */
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
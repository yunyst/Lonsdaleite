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
      <!-- 使用瀑布流布局 -->
      <view class="goods-grid">
        <view class="goods-column" v-for="(column, cIndex) in columns" :key="cIndex">
          <view class="goods-card" v-for="(good, gIndex) in column" :key="good.id">
            <AllGoodsCard :good="good" @goProductDetail="goProductDetail"></AllGoodsCard>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
      <u-loadmore :status="loadMoreStatus" :icon-type="'circle'" :load-text="loadText"
        @loadmore="loadMoreGoods"></u-loadmore>
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
        limit: 10,
        loading: false, //goods loading
        hasMore: true,
        loadMoreStatus: "loadmore", //控制u-load-more组件
        //加载前值为loadmore，加载中为loading，没有数据为nomore
        loadText: {
          loadmore: '轻轻上拉哦~~~~~~~~',
          loading: '努力加载中~~~~~~~',
          nomore: '实在是没有了呜呜呜呜呜呜~~~~'
        },
      };
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
      // ×前往商品详情
      goProductDetail(product) {
        console.log("子组件传递过来的值：", product);
        // uni.showToast({
        //   title: '查看商品：' + product.name,
        //   icon: 'none'
        // })
        // TODO: uni.navigateTo({ url: '/pages/detail/detail?id=' + product.id })
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
      },
      //获取商品卡片详情 调用云函数请求全部商品信息
      async loadMoreGoods() {
        if (this.loading || !this.hasMore) return;
        this.loading = true;
        this.loadMoreStatus = "loading";

        try {
          const res = await uniCloud.callFunction({
            name: 'getProductCardInfo',
            data: {
              pageType: this.activeCategory,
              skip: this.skip,
              limit: this.limit
            }
          });

          const products = res.result.data || [];
          this.allGoods = this.allGoods.concat(products);
          this.skip += products.length;

          if (products.length < this.limit) {
            this.hasMore = false;
            this.loadMoreStatus = "nomore";
          }
        } catch (err) {
          console.error('加载更多失败:', err);
          uni.showToast({
            title: '加载失败',
            icon: 'none'
          });
        } finally {
          this.loading = false;
          if (this.loadMoreStatus !== "nomore") {
            this.loadMoreStatus = "loadmore"
          }
        }
      }

    },
    mounted() {
      this.loadMoreGoods().then(() => {
        console.log("allGoods 数据加载完成", this.allGoods)
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
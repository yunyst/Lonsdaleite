<template>
  <view>
    <!-- Banner 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="banner in bannerList" :key="banner.id">
        <image :src="banner.image" class="swiper-image" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>
    <view class="card">
      <view class="card1">
        <view class="titlemask">
          <view class="title">
            人气精选
          </view>
        </view>
        <scroll-view scroll-x="true" class="card-scroll">
          <view class="card-scroll-child">
            <view v-for="product in cardProducts" :key="product.product_id">
              <ProductCard :product="product" @goProductDetail="goProductDetail" />
            </view>
          </view>
        </scroll-view>
      </view>
      <TransProductsCard :pageType="pageType" @goProductDetail="goProductDetail"></TransProductsCard>
    </view>
    <!-- 展示所有商品 -->
    <AllProduct></AllProduct>
  </view>
</template>

<script>
  import AllProduct from "../../components/AllProduct/AllProduct.vue";
  import ProductCard from "../../components/ProductCard/ProductCard.vue"
  import TransProductsCard from "../../components/TransProductsCard/TransProductsCard.vue"
  export default {
    data() {
      return {
        pageType: "makeup",
        isLoading: false,
        bannerList: [],
        cardProducts: [],

      }
    },
    components: {
      AllProduct,
      ProductCard,
      TransProductsCard
    },
    methods: {
      // 获取banner数据
      async fetchBanners(pageType = 'cleaning') {
        this.isLoading = true;
        this.error = null;
        try {
          // 使用插件中的 $smartCloud 方法调用云函数
          const result = await this.$smartCloud('getBanners', {
            pageType
          }, {
            loadingText: "数据加载中...",
            cacheExpire: 600, //s
            retryTimes: 2, // 失败后最多重试2次
            retryDelay: 500 // 每次重试间隔500ms
          });

          // 如果云函数返回数据正常
          this.bannerList = result || []; // 这里不需要再检查 result.result.code

        } catch (err) {
          // 捕获到的错误会通过插件统一处理
          this.error = '网络请求失败，请稍后重试';
        } finally {
          this.isLoading = false;
        }
      },
      async fetchCardProducts() {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getMakeupCardProducts'
          });
          if (result.result.code === 200) {
            this.cardProducts = result.result.data || [];
            console.log(this.cardProducts)
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
      goProductDetail(product) {
        console.log("子组件传递过来的值：", product.product_id);
        uni.navigateTo({
          url: `/pages/productDetail/productDetail?productId=${product.product_id}`
        })
      },
    },
    mounted() {

    },
    created() {
      this.$store.dispatch('updateCategory', this.pageType)
      this.fetchBanners(this.pageType).then(() => {
        console.log(`${this.pageType} banners successful`)
      }).catch((err) => {
        console.log(err.message)
      })
      this.fetchCardProducts().then(() => {
        console.log("CardProducts success")
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
</script>

<style scoped lang="scss">
  /* Banner */
  .swiper {
    width: 100%;
    height: 400rpx;
    margin-bottom: 10rpx;
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
    background-color: rgba(255, 255, 255, 1);
  }

  ::v-deep .wx-swiper-dot-active {
    background-color: #ffffff;
    width: 15px;
    height: 5px;
    border-radius: 5px;
  }

  .card {
    width: 100%;
    height: auto;
    margin: 20rpx 0 0 0;
    padding: 15rpx;

    .card1 {
      width: 725rpx;
      height: 480rpx;
      border-radius: 10rpx;
      // background-color: #ffb4b5;
      background: linear-gradient(to bottom, #ffd0d3, #fe9193);
      opacity: 0.9;
      margin-bottom: 20rpx;

      .titlemask {
        float: left;
        width: 80rpx;
        height: 480rpx;
        border-radius: 10rpx 0 0 10rpx;
        background-color: #ec7678;
        display: flex;
        justify-content: center;
        box-shadow: 5rpx 0 10rpx #b05772;

        .title {
          padding: 19rpx;
          writing-mode: vertical-rl;
          color: #fff2fc;
          font-size: 28rpx;
          font-weight: 500;
          letter-spacing: 4px;
        }
      }

      .card-scroll {
        float: right;
        width: 638rpx;
        height: 465rpx;
        overflow-x: auto;
        white-space: nowrap;
        // background-color: skyblue;
      }

      .card-scroll-child {
        display: flex;
        flex-direction: row;
      }
    }
  }
</style>
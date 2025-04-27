<template>
  <view>
    <!-- Banner 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="banner in bannerList" :key="banner.id">
        <image :src="banner.image" class="swiper-image" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>
    <view class="card">
      <TransProductsCard :pageType="pageType" @goProductDetail="goProductDetail"></TransProductsCard>
    </view>
    <AdCard :pageType="pageType"></AdCard>
    <AllProduct></AllProduct>
  </view>
</template>

<script>
  import AllProduct from "../../components/AllProduct/AllProduct.vue";
  import TransProductsCard from "../../components/TransProductsCard/TransProductsCard.vue"
  import AdCard from "../../components/AdCard/AdCard.vue";
  export default {
    data() {
      return {
        pageType: "bodycare",
        isLoading: false,
        bannerList: []
      }
    },
    components: {
      AllProduct,
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
    }
  }
</script>

<style scoped>
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

  .card {
    width: 100%;
    height: auto;
    margin: 20rpx 0 0 0;
    padding: 15rpx;
  }
</style>
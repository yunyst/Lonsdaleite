<template>
  <view>
    <!-- Banner 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="banner in bannerList" :key="banner.id">
        <image :src="banner.image" class="swiper-image" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>
    <AllProduct></AllProduct>
  </view>
</template>

<script>
  import AllProduct from "../../components/AllProduct/AllProduct.vue";
  export default {
    data() {
      return {
        pageType: "skincare",
        isLoading: false,
        bannerList: []
      }
    },
    components: {
      AllProduct
    },
    methods: {
      // 获取banner数据
      async fetchBanners() {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getBanners', // 你的云函数名称
            data: {
              pageType: this.pageType // 传递参数
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
    },
    mounted() {
      this.fetchBanners().then(() => {
        console.log(`${this.pageType} banners successful`)
      }).catch((err) => {
        console.log(err.message)
      })
    },
    created() {
      this.$store.dispatch('updateCategory', this.pageType)
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
</style>
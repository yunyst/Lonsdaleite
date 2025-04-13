<template>
  <view class="container" :style="{ backgroundColor: adInfo.themeColor }">

    <view class="ad-image" @click="handleViewMore">
      <image :src="adInfo.imageUrl" mode="scaleToFill" style="width: 100%;">
      </image>
      <view class="image-viewmore">
        <view class="text">view more</view>
      </view>
    </view>
    <view class="tip-card">
      <view class="tip-title">{{adInfo.headline}}</view>
      <view class="detail">
        <view class="tip-text">{{adInfo.detail}}</view>
        <view class="tip-more" @click="handleViewMore">查看更多></view>
      </view>
      <!-- 产品卡片列表 -->
      <scroll-view scroll-x="true" class="card-scroll">
        <view class="card-scroll-child">
          <view v-for="product in cardProducts" :key="product.product_id">
            <ProductCard :product="product" @goProductDetail="goProductDetail" />
          </view>
        </view>
      </scroll-view>
    </view>


  </view>
</template>

<script>
  import ProductCard from "../../components/ProductCard/ProductCard.vue"
  export default {
    name: "AdCard",
    data() {
      return {
        isLoading: false,
        adInfo: null,
        cardProducts: []
      };
    },
    props: {
      pageType: {
        type: String,
        required: true
      }
    },
    components: {
      ProductCard
    },
    methods: {
      goProductDetail(product) {
        console.log("子组件传递过来的值：", product.product_id);
        uni.navigateTo({
          url: `/pages/productDetail/productDetail?productId=${product.product_id}`
        })
      },
      handleViewMore() {
        // console.log("view more")
        if (this.adInfo.toPageImgUrl) {
          uni.navigateTo({
            url: `/pages/adPage/adPage?toPageImgUrl=${encodeURIComponent(this.adInfo.toPageImgUrl)}`
          });
        } else {
          console.error("toPageImgUrl is missing or invalid.");
        }
      },
      async fetchAdInfo(pageType) {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getAdInfo',
            data: {
              pageType: pageType
            }
          });
          if (result.result.code === 200) {
            this.adInfo = result.result.data || [];
            console.log(this.adInfo)
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
      async fetchAdBrandProducts(brand_id) {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getAdBrandProducts',
            data: {
              brand_id: brand_id
            }
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
      }
    },
    mounted() {
      this.fetchAdInfo(this.pageType).then(() => {
        console.log("adInfo successful load");
        console.log(this.adInfo)
        this.fetchAdBrandProducts(this.adInfo.brand_id).then(() => {
          console.log("cardProducts successful load");
          console.log(this.cardProducts)
        })
      })

    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 96%;
    height: 1000rpx;
    margin: 20rpx 14rpx;
    // background-color: #c78b4f;
    border-radius: 30rpx;
    position: relative;
  }

  .ad-image {
    width: 100%;
    height: 400rpx;
    border-radius: 30rpx 30rpx 0 0;
    position: relative;
    overflow: hidden;

    .image-viewmore {
      position: absolute;
      bottom: 30rpx;
      right: 40rpx;
      width: 150rpx;
      height: 40rpx;
      border-radius: 30rpx;
      background-color: #000000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }

    .text {
      font-size: 18rpx;
      line-height: 20rpx;
    }
  }

  .tip-card {
    width: 100%;
    height: 450rpx;

    .tip-title {
      margin: 15rpx 15rpx;
      width: auto;
      line-height: 40rpx;
      font-weight: 700;
      font-size: 35rpx;
      color: #fff;
      letter-spacing: 5rpx
    }

    .detail {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20rpx;

      .tip-text {
        margin: 10rpx 15rpx;
        width: auto;
        line-height: 26rpx;
        font-size: 24rpx;
        color: #fff;
      }

      .tip-more {
        width: auto;
        line-height: 26rpx;
        font-size: 24rpx;
        color: #fff;
      }
    }
  }

  /* right */
  .card-scroll {
    position: absolute;
    bottom: 30rpx;
    width: 100%;
    height: 465rpx;
    overflow-x: auto;
    white-space: nowrap;
    overflow: hidden;
    // background-color: #000000;
  }

  .card-scroll-child {
    display: flex;
    flex-direction: row;
  }
</style>
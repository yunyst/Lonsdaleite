<template>
  <view class="brandcard-container">
    <view class="brandcard-section">
      <view class="content">
        <image class="img" :src="brand.logo" mode="scaleToFill"></image>
      </view>
      <view class="brandInfo" v-if="brand">
        <view class="title">
          {{brand.en_name.toUpperCase()}}
        </view>
        <view class="info">
          该品牌有{{brand.count}}件在售商品
        </view>
      </view>
      <view class="viewmore">
        <view class="text">
          进入品牌
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "brandCard",
    data() {
      return {
        isLoading: false,
        brand: null
      };
    },
    props: {
      brandId: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.fetchBrand(this.brandId).then(() => {})
    },
    methods: {
      async fetchBrand(brand_id) {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getBrands',
            data: {
              brand_id: brand_id
            }
          });
          if (result.result.code === 200) {
            this.brand = result.result.data || [];
            console.log(this.brand)
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
    }
  }
</script>

<style scoped lang="scss">
  .brandcard-container {
    width: 100%;
    height: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10rpx 0;

    .brandcard-section {
      width: 710rpx;
      height: 200rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;

      background-color: #fff;

      .content {
        display: flex;
        align-items: center;

        .img {
          margin-left: 10rpx;
          width: 180rpx;
          height: 140rpx;
        }
      }

      .brandInfo {
        width: auto;
        max-width: 400rpx;
        height: 100rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 22rpx;
          line-height: 44rpx;
          font-family: 'boldonse', sans-serif;
        }

        .info {
          font-size: 24rpx;
          color: dimgray;
          line-height: 40rpx;
        }
      }

      .viewmore {
        margin-left: auto;
        margin-right: 20rpx;
        background-color: #000000;
        width: 140rpx;
        height: 40rpx;
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2rpx 4rpx 10rpx #949494;

        .text {
          color: #fff;
          font-size: 24rpx;
          line-height: 26rpx;
        }
      }
    }


  }
</style>
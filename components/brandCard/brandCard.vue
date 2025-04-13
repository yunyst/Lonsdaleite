<template>
  <view class="brandcard-container">
    <view class="brandcard-section">
      <view class="content">
        <image class="img" :src="brand.logo" mode="scaleToFill"></image>
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
      justify-content: center;
      flex-direction: column;
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
    }


  }
</style>
<template>
  <!-- card高度自适应 -->
  <view>
    <view class="product-item" @click="handleClick(good)">
      <image :src="good.imageUrl" class="product-img" mode="widthFix" />
      <view class="product-info">
        <view class="tagProduct">
          <view class="new" v-if="good.is_new === 'TRUE'">
            <text>New</text>
          </view>
          <view class="only" v-if="good.is_exclusive === 'TRUE'">
            <text>独家</text>
          </view>
        </view>
        <view class="product-brand">
          <view>{{ good.brand_en_name }}</view>
        </view>
        <view class="product-name">
          <text>{{ good.name }}</text>
        </view>
        <view class="product-price">
          <text>¥{{ good.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "AllGoodsCard",
    data() {
      return {};
    },
    props: {
      good: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick(product) {
        this.$emit('goProductDetail', product)
      }
    }
  }
</script>

<style scoped lang="scss">
  .product-item {
    width: 42vw;
    margin: 10rpx 10rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 13rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.15);
  }

  .product-img {
    width: 100%;
    height: auto;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
  }

  .product-info {
    text-align: left;
    display: flex;
    flex-direction: column;
    /* border: #000000 1rpx solid; */
  }

  .product-name {
    font-size: 24rpx;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    line-height: 24px;
    height: 25px;
    // border: #000000 1rpx solid;
  }

  .product-price {
    font-size: 28rpx;
    font-weight: 700;
    color: #000000;
    margin-top: 5rpx;
    // border: #000000 1rpx solid;
  }

  .tagProduct {
    line-height: 20rpx;
    margin-bottom: 8rpx;
    display: flex;
    gap: 10rpx;
    // border: #000000 1rpx solid;
  }

  .new {
    width: 40rpx;
    height: 22rpx;
    border: #ff007f 1px solid;
    border-radius: 7rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #ff007f;
    display: flex;
    justify-content: center;
    align-items: cneter;
    padding: 1rpx;
  }

  .only {
    width: 40rpx;
    height: 22rpx;
    border: #08d2ff 1px solid;
    border-radius: 7rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #08d2ff;
    display: flex;
    justify-content: center;
    align-items: cneter;
    padding: 1rpx;
  }

  .product-brand {
    font-family: 'boldonse', sans-serif;
    font-weight: 400;
    font-size: 12rpx;
    margin-top: 5rpx;
  }
</style>
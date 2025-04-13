<template>
  <!-- card高度固定 -->
  <view>
    <view class="product-item" @click="handleClick(product)">
      <view class="product-img">
        <image :src="product.imageUrl" class="img" mode="widthFix" />
      </view>
      <view class="product-info">
        <view class="tagProduct">
          <view class="new" v-if="product.is_new === 'TRUE'">
            <text>New</text>
          </view>
          <view class="only" v-if="product.is_exclusive === 'TRUE'">
            <text>独家</text>
          </view>
        </view>
        <view class="product-brand">
          <view>{{ product.brand_en_name }}</view>
        </view>
        <view class="product-name">
          <text>{{ product.name }}</text>
        </view>
        <view class="product-price">
          <text>¥{{ (product.original_price*(1-product.discount)).toFixed(2) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ProductCard",
    data() {
      return {};
    },
    props: {
      product: {
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
    width: 200rpx;
    height: 400rpx;
    margin: 20rpx 15rpx;
    padding: 20rpx;
    display: inline-block;
    background-color: #fff;
    border-radius: 13rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
    // border: #000000 1rpx solid;
    position: relative;
  }

  .product-img {
    width: 200rpx;
    height: 230rpx;
    margin-bottom: 15rpx;
    position: relative;
    overflow: hidden;

    .img {
      position: absolute;
      width: 100%;
      height: auto;
      border-radius: 10rpx;
      object-fit: contain;
    }
  }


  .product-info {
    text-align: left;
    display: flex;
    flex-direction: column;
    // white-space: pre-wrap;
  }

  .product-name {
    position: absolute;
    top: 320rpx;
    width: 200rpx;
    // height: 40rpx;
    margin-bottom: 5rpx;
    font-size: 20rpx;
    color: #333;
    white-space: pre-wrap;
    // line-height: 24px;
    height: 28px;
    font-weight: 700;
    display: -webkit-box;
    /* 使用 flexbox 样式 */
    -webkit-box-orient: vertical;
    /* 垂直排列文本 */
    -webkit-line-clamp: 2;
    /* 限制显示的行数为2行，可以根据需要调整 */
  }


  .product-price {
    position: absolute;
    top: 385rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #000000;
    margin-top: 5rpx;
  }

  .tagProduct {
    position: absolute;
    width: 200rpx;
    height: 25rpx;
    top: 255rpx;
    line-height: 20rpx;
    margin-bottom: 6rpx;
    display: flex;
    gap: 10rpx;

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

  }

  .product-brand {
    position: absolute;
    top: 290rpx;
    font-family: 'boldonse', sans-serif;
    font-weight: 400;
    font-size: 12rpx;
    margin-top: 5rpx;
  }
</style>
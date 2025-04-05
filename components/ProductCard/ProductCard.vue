<template>
  <!-- card高度固定 -->
  <view>
    <view class="product-item" @click="handleClick(product)">
      <image :src="product.img" class="product-img" mode="widthFix" />
      <view class="product-info">
        <view class="tagProduct">
          <view class="new" v-if="product.new">
            <text>New</text>
          </view>
          <view class="only" v-if="product.only">
            <text>独家</text>
          </view>
        </view>
        <view class="product-brand">
          <view>{{ product.brand }}</view>
        </view>
        <view class="product-name">
          <text>{{ product.name }}</text>
        </view>
        <view class="product-price">
          <text>¥{{ product.price }}</text>
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
    height: 360rpx;
    // height: auto;
    margin: 20rpx;
    padding: 20rpx;
    display: inline-block;
    background-color: #fff;
    border-radius: 13rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
    // border: #000000 1rpx solid;
  }

  .product-img {
    width: 200rpx;
    height: 300rpx;
    border-radius: 10rpx;
    margin-bottom: 15rpx;
    // border: #000000 1rpx solid;
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

  // .product-name::after {
  //   content: "...";
  //   background: white;
  //   position: absolute;
  //   /* bottom: 0; */
  //   right: 0;
  //   padding: 0 15px 0 10px;
  // }

  .product-price {
    font-size: 26rpx;
    color: #000000;
    margin-top: 5rpx;
    // border: #000000 1rpx solid;
  }

  .tagProduct {
    line-height: 20rpx;
    margin-bottom: 6rpx;
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
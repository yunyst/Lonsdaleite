<template>
  <view>
    <view v-for="(product, pIndex) in products" :key="pIndex" class="product-item" @click="handleClick(product)">
      <image :src="product.img" class="product-img" mode="widthFix" />
      <view class="product-info">
        <view class="newProduct" v-if="product.new">
          <text>new</text>
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
      products: {
        type: Array,
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
    height: 330rpx;
    margin: 20rpx;
    padding: 20rpx;
    display: inline-block;
    background-color: #fff;
    border-radius: 13rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
  }

  .product-img {
    width: 200rpx;
    height: 300rpx;
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
    position: relative;
    line-height: 24px;
    height: 25px;
    // border: #000000 1rpx solid;
  }

  .product-name::after {
    content: "...";
    background: white;
    position: absolute;
    /* bottom: 0; */
    right: 0;
    padding: 0 15px 0 10px;
  }

  .product-price {
    font-size: 26rpx;
    color: #000000;
    margin-top: 5rpx;
    // border: #000000 1rpx solid;
  }

  .newProduct {
    font-size: 20rpx;
    // border: #ffaaff 1px solid;
    color: #ff007f;
    line-height: 15rpx;
    margin-bottom: 10rpx;
  }
</style>
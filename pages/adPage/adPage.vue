<template>
  <view class="container">
    <image class="image" :src="toPageImgUrl" mode="widthFix">
    </image>
    <view class="view-brand">
      <view class="view-text" @click="handleToBrand">
        点击查看品牌详情
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        toPageImgUrl: '',
        toBrandUrl: ''
      }
    },
    onLoad(options) {
      // 获取传递的 `toPageImgUrl` 参数
      this.toPageImgUrl = decodeURIComponent(options.toPageImgUrl) || '';
      console.log(this.toPageImgUrl)
    },
    methods: {
      handleToBrand() {
        console.log("点击查看品牌详情")
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: auto;
    position: relative;
  }

  .image {
    width: 100%;
  }

  .view-brand {
    position: absolute;
    bottom: 50rpx;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view-text {
    width: 350rpx;
    height: 90rpx;
    border-radius: 50rpx;
    background-color: #000000;
    color: #fff;
    font-size: ;
    z-index: 100;
    line-height: 60prx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
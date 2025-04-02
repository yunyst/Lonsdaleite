<template>
  <view class="container">
    <view class='page404'>
      页面未找到404！
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    onLoad() {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        uni.switchTab({
          url: '/pages/home/home'
        })
      }, 2000)
    },
    onUnload() {

    }
  }
</script>

<style>
  .container {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .page404 {
    position: absolute;
    color: black;
    font-size: 50rpx;
  }
</style>
<template>
  <view>
    <!-- 遮罩层 -->
    <transition name="fade">
      <view v-if="show" class="popup-mask" @tap="handleClose"></view>
    </transition>

    <!-- 弹窗内容 -->
    <transition name="zoom">
      <view v-if="show" class="popup-container">
        <view class="popup-content">
          {{ content }}
        </view>
        <view class="popup-footer">
          <button @tap="handleConfirm">确认</button>
        </view>
      </view>
    </transition>

  </view>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      content: {
        type: String,
        default: '默认内容'
      }
    },
    methods: {
      handleClose() {
        this.$emit('close')
      },
      handleConfirm() {
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>
  /* 遮罩层动画 */
  /* .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .zoom-enter-active,
  .zoom-leave-active {
    transition: all 3s ease;
  }

  .zoom-enter,
  .zoom-leave-to {
    opacity: 0;
    transform: scale(0.5);
  } */

  .popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(188, 188, 188, 0.5);
    z-index: 999;
  }

  .popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600rpx;
    background-color: #fff;
    border-radius: 40rpx;
    overflow: hidden;
    z-index: 1000;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
  }

  .popup-content {
    padding: 40rpx;
    font-size: 30rpx;
    text-align: center;
    color: #333;
  }

  .popup-footer {
    border-top: 1rpx solid #eee;
    padding: 20rpx;
    display: flex;
    justify-content: center;
  }

  .popup-footer button {
    background-color: #000000;
    color: white;
    margin-top: 5rpx;
    width: 40%;
    height: 56rpx;
    font-size: 26rpx;
    line-height: 30rpx;
    border-radius: 40rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
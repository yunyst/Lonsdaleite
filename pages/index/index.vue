<template>
  <view>
    <view class="content">
      <input type="text" class="input" v-model="content" placeholder="message" />
      <button type='primary' @click='publish()' size='mini'>publish</button>
    </view>
    <view v-for="item in list" :key="item._id">
      <view class="messageBox">
        <view>{{item.content}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // content: ""
        content: "Hello,beakhyun'girlfriend",
        list: []
      }
    },
    onLoad() {
      uniCloud.callFunction({
        name: 'fun',
        data: {
          api: 'getMessage',
        }
      }).then(res => {
        this.list = res.result.data
      })
    },
    methods: {
      publish() {
        uniCloud.callFunction({
          name: 'fun',
          data: {
            api: 'publish',
            content: this.content
          },
        }).then(res => {
          this.list.unshift({
            _id: res.result._id,
            content: this.content
          })
          this.content = ''
        }).catch(err => {
          console.log(err.message)
        })
      }
    },
    onShareAppMessage() {

    },
    onShareTimeline() {

    }
  }
</script>

<style>
  .content {
    display: flex;
    align-items: center;
    margin: 40rpx
  }

  .input {
    border-bottom: 1px solid #ccc;
    padding: 6rpx;
    flex: 1
  }

  .messageBox {
    margin: 40rpx;
    border-bottom: 1px solid #ccc;
    padding: 20rpx;
  }
</style>
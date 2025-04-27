<template>
  <view>
    <Login v-if="showLoginModal" @success="onLoginSuccess"></Login>
    <view v-else class="container">
      <view class="header-card">
        <view class="partup">
          <view class="avatar">
            <u-avatar :src="src" size="120" :show-sex="true" :show-level="true"></u-avatar>
          </view>
          <view class="title">
            <view class="nick-name">
              yunyst
            </view>
            <view class="detail-vip">
              您只需要任意消费即可升级为一级VIP
            </view>
          </view>
          <view class="tools">
            <view>
              <u-icon name="setting" color="#000000" size="34"></u-icon>
              <view class="cue">设置</view>
            </view>
            <view>
              <u-icon name="server-fill" color="#000000" size="34"></u-icon>
              <view class="cue">客服</view>
            </view>
            <view>
              <u-icon name="bell" color="#000000" size="34"></u-icon>
              <view class="cue">消息</view>
            </view>
          </view>
        </view>

        <view class="partdown-noticed">
          <view class="part" v-for="(infoList,index) in infoList" :key="index">
            <view class="count">
              {{infoList.count}}
            </view>
            <view class="title">
              {{infoList.title}}
            </view>
          </view>

        </view>
        <view class="notice-bar">
          <u-notice-bar bgColor="#fff" color="#000" :text="noticeBarList" direction="column"
            fontSize="22"></u-notice-bar>
        </view>
      </view>

      <view class="card-container">
        <view class="my-order">
          <view class="header">
            <view class="title">
              我的订单
            </view>
            <view class="view-all">
              查看全部 >
            </view>
          </view>
          <view class="content">
            <view class="part" v-for="(orderList,index) in orderList" :key="index">
              <u-icon :name="orderList.icon" size="56" color="#000"></u-icon>
              <view class="title">
                {{orderList.title}}
              </view>
            </view>
          </view>
        </view>
        <!-- <view class="category-tool"></view> -->
      </view>
      <view class="accessControl">
        <button v-if="canAccess('user')" @click="userAction">普通用户操作</button>
        <button v-if="canAccess(['admin'])" @click="adminAction">管理员操作</button>
        <button v-if="canAccess(['admin', 'superadmin'])" @click="superAction">超级管理操作</button>
        <button v-if="canAccess(['vip','user'])" @click="vipAction">VIP功能</button>
      </view>
      <AllProduct></AllProduct>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Login from '../../components/Login/Login.vue'
  import AllProduct from '../../components/AllProduct/AllProduct.vue'
  import {
    hasPermission
  } from '@/utils/permission.js';
  export default {
    components: {
      Login,
      AllProduct
    },
    computed: {
      ...mapState({
        showLoginModal: state => state.login.showLoginModal,
        noticeBarList: state => state.userCenter.noticeBarList,
        infoList: state => state.userCenter.infoList,
        orderList: state => state.userCenter.orderList,
        //userInfo
        user: state => state.userInfo.userInfo,
        permissions: state => state.userInfo.permissions,
      })
    },
    data() {
      return {
        src: 'https://lonsdaleite.oss-cn-beijing.aliyuncs.com/products/products/B0010_lartisanparfumeur/fragrance/1-01b64c9be3803cb1b9574ed644030986ff178981.jpg',
      }
    },
    onLoad() {
      // 直接检测用户信息并操作Store
      // console.log("account", this.showLoginModal)
      if (!this.$store.state.login.userInfo || !this.$store.state.login.token) {
        this.$store.dispatch('openLoginModal', 'tab'); // 直接显示登录弹窗('tab'/'detail')
      }
    },
    async onShow() {
      this.onLoginSuccess().then(() => {
        // console.log("成功")
      })
    },
    methods: {
      async onLoginSuccess() {
        const authData = uni.getStorageSync('auth_data');
        const userInfo = authData ? authData.uid : null;
        if (userInfo) {
          await this.$store.dispatch('fetchUser', {
            account: userInfo,
            smartCloud: this.$smartCloud
          });
          console.log("登录成功之后拿到的用户信息:", this.user);
          console.log("permissions", this.permissions)
          console.log("Vuex userInfo:", this.$store.state.userInfo);
        }
      },
      canAccess(permission) {
        return hasPermission(permission);
      },
      userAction() {
        console.log('普通用户功能');
        uni.navigateTo({
          url: '/pages/404/404'
        });
      },
      adminAction() {
        console.log('管理员功能');
      },
      superAction() {
        uni.showToast({
          title: '此功能需要超级管理员权限',
          icon: 'none'
        });
        console.log('超级管理员功能');
      },
      vipAction() {
        console.log('VIP功能');
        if (this.permissions.includes('vip')) {
          // 是vip，允许跳转
          uni.navigateTo({
            url: '' //vip页面
          });
        } else {
          // 不是vip，只弹提示
          uni.showToast({
            title: '此功能需要VIP权限',
            icon: 'none'
          });
        }
      }
    },

  }
</script>
<style scoped lang="scss">
  /* 禁用状态样式 */
  .accessControl {
    display: flex;
    justify-content: space-between;

    button {
      font-size: 22rpx;
      width: 180rpx;
      height: 60rpx;
      background-color: #000000;
      border-radius: 20rpx;
      box-shadow: 4rpx 4rpx 8rpx #000000;
      color: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .container {
    background-color: #f8f8f8;

  }

  .header-card {
    width: 100%;
    height: 400rpx;
    // background-size: contain;
    // background-position: center;
    // background-repeat: no-repeat;
    background-repeat: repeat;
    background-size: auto;
    background-image: url("https://lonsdaleite.oss-cn-beijing.aliyuncs.com/home/background/makeupBackground.webp");
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .partup {
      width: 100%;
      height: 180rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .avatar {
        width: 180rpx;
        height: 180rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .title {
        width: 360rpx;
        height: 180rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 26rpx;

        .nick-name {
          height: 60rpx;
          padding: 5rpx 20rpx;
        }

        .detail-vip {
          font-size: 20rpx;
          padding-left: 20rpx;
        }
      }

      .tools {
        flex: 1;
        height: 140rpx;
        padding: 10rpx;
        display: flex;
        justify-content: flex-end; // 靠右
        align-items: center;
        gap: 20rpx;
        padding: 0rpx 20rpx;

        .cue {
          margin-top: 8rpx;
          font-size: 20rpx;
        }
      }
    }

    .partdown-noticed {
      width: 100%;
      height: 160rpx;
      align-self: end;
      display: flex;
      justify-content: space-around;

      .part {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100rpx;

        .count {
          font-size: 45rpx;
          color: #303030;
        }

        .title {
          margin-top: 8rpx;
          font-size: 20rpx;
        }
      }
    }

    .notice-bar {
      position: absolute;
      bottom: 10rpx;
      width: 640rpx;
      border-radius: 30rpx;
      overflow: hidden;
    }
  }

  .card-container {
    width: 100%;
    height: auto;
    margin: 20rpx 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20rpx;

    .my-order {
      width: 640rpx;
      height: auto;
      border-radius: 30rpx;
      background-color: #fff;
      padding: 20rpx 30rpx;

      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 26rpx;
        margin-top: 10rpx;

        .title {
          font-size: 28rpx;
          font-weight: 700;
        }
      }

      .content {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-around;
        font-size: 24rpx;

        .part {
          width: 130rpx;
          height: 120rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8rpx;
        }
      }
    }

    // .category-tool {
    //   width: 700rpx;
    //   height: 300rpx;
    //   border-radius: 30rpx;
    //   background-color: #fff;
    // }
  }
</style>
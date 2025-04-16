<template>
  <view>
    <!--A[触发登录] -> B[显示当前页的Login组件]
     B -> C{用户操作}
     C ->|点击关闭| D[关闭弹窗]
     C ->|登录成功| E[更新userInfo并关闭弹窗]
     E -> F[当前页自动渲染已登录内容] -->

    <!-- 可用组件 -->
    <!-- <u-notice-bar :volume-icon="false" :list="list"></u-notice-bar> -->
    <Login v-if="showLoginModal"></Login>
    <view class="" v-else class="container">
      personal center
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Login from '../../components/Login/Login.vue'
  export default {
    components: {
      Login
    },
    computed: {
      ...mapState({
        showLoginModal: state => state.login.showLoginModal,
      })
    },
    data() {
      return {}
    },
    onLoad() {
      // 直接检测用户信息并操作Store
      // console.log("account", this.showLoginModal)
      if (!this.$store.state.login.userInfo || !this.$store.state.login.token) {
        this.$store.dispatch('openLoginModal', 'tab'); // 直接显示登录弹窗('tab'/'detail')
      }
    },
    onLaunch() {
      // 获取 token 并验证
      // this.$store.dispatch('verifyToken').then(isValid => {
      //   if (!isValid) {
      //     // 如果 token 无效，或者验证失败，显示登录弹窗
      //     this.$store.dispatch('openLoginModal', 'tab');
      //   }
      // });
    },
    methods: {
      // ...mapActions(["verifyToken"])
    }
  }
</script>
<style scoped>
  .container {
    /* height: ; */
  }
</style>
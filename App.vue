<script>
  export default {

    onLaunch: function() {
      console.log('App Launch')
      // 获取 token 并验证
      this.checkAuth();
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    onPageNotFound() {
      uni.navigateTo({
        url: '/pages/404/404'
      })
    },
    methods: {
      async checkAuth() {
        // 获取存储的认证数据
        const authData = uni.getStorageSync('auth_data');
        // console.log("authData", authData)
        // 基础检查
        if (!authData?.token) {
          this.gotoLogin();
          return;
        }
        // 检查本地过期时间（避免不必要的云函数调用）
        if (Date.now() > authData.expires) {
          uni.showToast({
            title: '登录已过期',
            icon: 'none'
          });
          this.gotoLogin();
          return;
        }
        // 云函数验证Token有效性
        const res = await uniCloud.callFunction({
          name: 'verifyToken',
          data: {
            token: authData.token
          }
        });
        console.log("验证token res", res)
        // 处理验证结果
        if (res.result.code === 200) {
          this.$store.commit('SET_USER_INFO', res.result.userInfo);
          this.$store.dispatch('closeLoginModal')

          const newToken = res.result.newToken;
          console.log("newToken")
          if (newToken) {
            // 存储新的 token
            console.log("SET_NEW_TOKEN")
            this.$store.commit('SET_NEW_TOKEN', newToken);
          }
        } else {
          this.gotoLogin();
        }
      },
      gotoLogin() {
        // 设置登录显示
        this.$store.commit('TOGGLE_LOGIN_MODAL', true);
      }
    }

  }
</script>

<style lang="scss">
  @import "uview-ui/index.scss";

  @font-face {
    font-family: "boldonse";
    src: url('https://lonsdaleite.oss-cn-beijing.aliyuncs.com/fonts/Boldonse-Regular.ttf?v=1') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: "sourceHan";
    font-size: normal;
    src: url('https://lonsdaleite.oss-cn-beijing.aliyuncs.com/fonts/SourceHanSansCN-Normal.ttf') format('truetype');
  }

  @font-face {
    font-family: "sourceHan";
    font-size: bold;
    src: url('https://lonsdaleite.oss-cn-beijing.aliyuncs.com/fonts/SourceHanSansCN-Medium.ttf') format('truetype');
  }
</style>
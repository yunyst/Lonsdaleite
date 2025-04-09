<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')

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
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
    src: url('http://su3fi9c95.hd-bkt.clouddn.com/font/Boldonse-Regular.ttf');
  }

  @font-face {
    font-family: "sourceHan";
    font-size: normal;
    src: url('http://su3fi9c95.hd-bkt.clouddn.com/font/SourceHanSansCN-Normal.ttf') format('truetype');
  }

  @font-face {
    font-family: "sourceHan";
    font-size: bold;
    src: url('http://su3fi9c95.hd-bkt.clouddn.com/font/SourceHanSansCN-Medium.ttf') format('truetype');
  }
</style>
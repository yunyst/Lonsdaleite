<template>
  <view>
    <Login></Login>
  </view>
</template>

<script>
  // import {
  //   mapState
  // } from 'vuex'
  import Login from '../../components/Login/Login.vue'

  export default {
    components: {
      Login
    },
    // computed: {
    //   ...mapState({
    //     showLoginModal: state => state.login.showLoginModal
    //   })
    // },
    data() {
      return {}
    },
    onLoad() {
      // console.log("account", this.showLoginModal)
    },
    methods: {

    }
  }
</script>
<style scoped>

</style>
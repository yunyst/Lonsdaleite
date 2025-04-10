<template>
  <view>
    <!-- Banner 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="banner in bannerList" :key="banner.id">
        <image :src="banner.image" class="swiper-image" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>
    <!-- 分类图标 -->
    <view class="icon-grid">
      <view v-for="(icon, index) in iconList" :key="index" class="icon-item">
        <image :src="icon.img" class="icon-img" mode="widthFix"></image>
        <text class="icon-title">{{ icon.title }}</text>
      </view>
    </view>

    <!-- 五大板块 -->
    <view class="section-wrap" v-for="(section, sIndex) in sections" :key="sIndex">
      <!-- 板块标题 -->
      <view class="section-title">{{ section.name }}</view>
      <!-- 板块内容 - 商品列表 -->
      <scroll-view scroll-x="true" class="product-scroll">
        <view class="product_scroll-child">
          <view v-for="product in section.products" :key="product.product_id">
            <ProductCard :product="product" @goProductDetail="goProductDetail" />
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 全部商品（下拉加载/上拉加载） -->
    <AllProduct></AllProduct>
  </view>
  </view>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import ProductCard from '../../components/ProductCard/ProductCard';
  import AllProduct from "../../components/AllProduct/AllProduct.vue";
  export default {
    components: {
      ProductCard,
      AllProduct
    },
    computed: {
      ...mapState({
        iconList: state => state.cleaning.iconList
      })
    },
    data() {
      return {
        pageType: "cleaning",
        //banner
        isLoading: false, //banner loading
        bannerList: [],
        sections: [],
      }
    },

    methods: {
      // ×前往商品详情
      goProductDetail(product) {
        console.log("子组件传递过来的值：", product);
        // uni.showToast({
        //   title: '查看商品：' + product.name,
        //   icon: 'none'
        // })
        // TODO: uni.navigateTo({ url: '/pages/detail/detail?id=' + product.id })
      },

      // 获取banner数据
      async fetchBanners(pageType = 'cleaning') {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getBanners', // 你的云函数名称
            data: {
              pageType: pageType // 传递参数
            }
          });
          if (result.result.code === 200) {
            this.bannerList = result.result.data || [];
            console.log(this.bannerList)
          } else {
            this.error = result.result.message || '获取数据失败';
          }
        } catch (err) {
          console.error('调用云函数失败:', err);
          this.error = '网络请求失败，请稍后重试';
        } finally {
          this.isLoading = false;
        }
      },
      //获取板块商品数据
      async fetchSections() {
        try {
          const res = await uniCloud.callFunction({
            name: 'getCleaningSectionProducts'
          });
          // console.log(res)
          this.sections = res.result
        } catch (err) {
          console.error('加载sections data失败:', err);
          uni.showToast({
            title: '加载失败',
            icon: 'none'
          });
        }
      }
    },
    mounted() {
      this.fetchBanners(this.pageType).then(() => {
        console.log(`${this.pageType} banners successful`)
      })
      this.fetchSections().then(() => {
        console.log("sections 数据加载完成", this.sections)
      })
    },
    created() {
      this.$store.dispatch('updateCategory', this.pageType)
    }
  }
</script>

<style scoped>
  /* Banner */

  .swiper {
    width: 100%;
    height: 400rpx;
  }

  .swiper-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 修改 swiper 指示点样式 */
  ::v-deep .wx-swiper-dot {
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255);
  }

  ::v-deep .wx-swiper-dot-active {
    background-color: #ffffff;
    width: 15px;
    height: 5px;
    border-radius: 5px;
  }

  /* 分类图标 */
  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    padding: 10rpx 10rpx;
    margin: 15rpx 20rpx;
    border-radius: 10rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
  }

  .icon-item {
    width: 16%;
    text-align: center;
    margin: 10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon-img {
    width: 60rpx;
    height: 60rpx;
    margin-bottom: 12rpx;
  }

  .icon-title {
    font-size: 20rpx;
    color: #333;
  }

  /* 五大板块 */
  .section-wrap {
    padding: 10rpx;
    margin: 10rpx 20rpx;
  }

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-top: 5rpx;
    margin-bottom: 10rpx;
    color: #333;
    padding-left: 20rpx;
  }

  .product-scroll {
    overflow-x: auto;
    white-space: nowrap;
    /* border: #000000 1px solid; */
  }

  .product_scroll-child {
    display: flex;
    flex-direction: row;
  }
</style>
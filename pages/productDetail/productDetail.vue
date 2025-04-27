<template>
  <view class="container" v-if="product">
    <Login v-if="showLoginModal" />

    <view class="real-content-container" v-else>
      <!-- 头部 -->
      <!-- -1是因为吸顶的时候有一个缝隙 -->
      <u-sticky offset-top="-1">
        <u-subsection :list="list" :current="curNow" @change="sectionChange" :animation="true" font-size="25rpx"
          :bold="true" active-color="black" inactive-color="gray"></u-subsection>
      </u-sticky>


      <view class="imgContainer" id="product">
        <image :src="product.info.imageUrl" mode="heightFix"></image>
      </view>

      <view class="info-container">
        <view class="info-section">
          <view class="price">
            ￥{{(product.info.original_price * (1 - product.info.discount)).toFixed(2)}}
          </view>
          <view class="discountInf">
            价值￥{{product.info.original_price}},折扣优惠{{product.info.discount*100}}%
          </view>
          <view class="title-info">
            <view class="title">
              {{product.info.name}}
            </view>
            <view class="description">
              {{product.detail.description}}
            </view>
          </view>
          <view class="tagProduct">
            <view class="new" v-if="product.info.is_new === 'TRUE'">
              <text>New</text>
            </view>
            <view class="only" v-if="product.info.is_exclusive === 'TRUE'">
              <text>独家</text>
            </view>
          </view>
          <view class="more-info">
            <view class="text">
              100%官方正品 ~ 顺丰EMS速递 · 丰富赠品 ~ 退货保障 · 安全支付
            </view>
          </view>
          <view class="data-info">
            <view class="rating">
              <view class="label">商品评分:</view>
              <view class="value">{{product.detail.rating}}</view>
            </view>
            <view class="stock">
              <view class="label">商品库存:</view>
              <view class="value">{{product.detail.stock}}</view>
            </view>
            <view class="sold">
              <view class="label">商品已售:</view>
              <view class="value">{{product.detail.sold}}</view>
            </view>
          </view>
        </view>
      </view>

      <brandCard v-if="product" :brandId="product.info.brand_id" id="brand"></brandCard>
      <view class="detail-container" id="detail">
        <view class="detail-section">
          <view class="title">
            商品详情
          </view>
          <view class="content">
            <view class="item" v-if="product.info.en_name">
              <view class="label">产品名称：</view>
              <view class="value">{{product.info.en_name}}</view>
            </view>
            <view class="item" v-if="product.detail.description">
              <view class="label">产品描述：</view>
              <view class="value">{{product.detail.description}}</view>
            </view>
            <view class="item">
              <view class="label">产品分类：</view>
              <view class="value">{{product.info.main_category}}&nbsp;{{product.info.sub_category}}</view>
            </view>
            <view class="item" v-if="product.detail.ingredients">
              <view class="label">产品成分：</view>
              <view class="value">{{product.detail.ingredients}}</view>
            </view>
            <view class="item" v-if="product.detail.how_to_use">
              <view class="label">产品使用：</view>
              <view class="value">{{product.detail.how_to_use}}</view>
            </view>
            <view class="item" v-if="product.detail.specifications">
              <view class="label">产品规格：</view>
              <view class="value">{{product.detail.specifications}}</view>
            </view>
            <view class="item">
              <view class="label">产品货号：</view>
              <view class="value">{{product.info.sku}}</view>
            </view>
          </view>
        </view>
      </view>
      <RecommendProduct :productInfo="product.info" id="recommend"></RecommendProduct>

      <u-tabbar placeholder :bg-color="bgcolor" :border-top="false">
        <u-button type="primary" text="加入购物车" shape="circle" @click="addToCart"></u-button>
        <u-button type="primary" text="立即购买" shape="circle" @click="purchase"></u-button>
      </u-tabbar>

    </view>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import brandCard from '../../components/brandCard/brandCard.vue'
  import RecommendProduct from '../../components/RecommendProduct/RecommendProduct.vue'
  import Login from '../../components/Login/Login.vue'
  export default {
    data() {
      return {
        bgcolor: "#f5f5f5",
        product_id: '',
        product: null,
        curNow: 0,
        isLoading: false
      }
    },
    components: {
      brandCard,
      RecommendProduct,
      Login
    },
    computed: {
      ...mapState({
        list: (state) => state.productDetail.list,
        showLoginModal: state => state.login.showLoginModal
      })
    },
    methods: {
      async fetchProductDetail(product_id) {
        this.isLoading = true
        const res = await uniCloud.callFunction({
          name: 'getProductDetail',
          data: {
            product_id: product_id
          }
        })
        this.product = res.result.data
        this.isLoading = false
      },
      sectionChange(index) {
        this.curNow = index;
        this.scrollToSection(this.curNow);
      },
      scrollToSection(index) {
        this.$nextTick(() => {
          const refId = this.list[index].ref
          // console.log("refId", refId)
          uni.createSelectorQuery().select(`#${refId}`).boundingClientRect(rect => {
            // console.log("rect", rect)
            if (rect) {
              uni.createSelectorQuery().selectViewport().scrollOffset(res => {
                const currentScrollTop = res.scrollTop
                const targetScrollTop = currentScrollTop + rect.top - this.$rpxToPx(60)
                const scrollSpeed = 100
                const duration = Math.min(Math.abs(targetScrollTop - currentScrollTop) / this.$rpxToPx(
                    scrollSpeed) * 1000,
                  1000)
                // console.log("currentScrollTop", currentScrollTop)
                // console.log("targetScrollTop", targetScrollTop)
                uni.pageScrollTo({
                  scrollTop: targetScrollTop,
                  duration: duration
                });
              }).exec()
            }
          }).exec()
        })
      },
      addToCart() {
        if (!this.$store.state.login.userInfo) {
          this.$store.dispatch('openLoginModal', 'detail');
        }

      },
      purchase() {
        if (!this.$store.state.login.userInfo) {
          this.$store.dispatch('openLoginModal', 'detail');
        }
      }
    },
    onLoad(options) {
      this.product_id = options.productId
      this.fetchProductDetail(this.product_id)
      if (!this.$store.state.login.userInfo) {
        this.$store.dispatch('closeLoginModal'); // 直接关闭登录弹窗('tab'/'detail')
      }
    },
  }
</script>
<style scoped lang="scss">
  .container .real-content-container {
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .imgContainer {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    /* background-color: #f7f7f7; */
  }

  .info-container {
    width: 100%;
    height: 380rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .info-section {
      width: 710rpx;
      height: 340rpx;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      background-color: #fff;

      // align-items: center;
      .price {
        position: absolute;
        top: 14rpx;
        width: 674rpx;
        height: 44rpx;
        margin: 10rpx 20rpx;
        line-height: 42rpx;
        font-size: 40rpx;
        font-family: 'sourceHan', sans-serif;
      }

      .discountInf {
        color: #b5b5b5;
        font-size: 24rpx;
        position: absolute;
        top: 58rpx;
        height: 44rpx;
        margin: 10rpx 20rpx;
      }

      .title-info {
        position: absolute;
        top: 120rpx;
        width: 100%;
        height: 130rpx;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        .title {
          width: 670rpx;
          height: auto;
          margin: 10rpx 20rpx;
          font-weight: 700;
          font-size: 30rpx;
          line-height: 34rpx;
          word-wrap: break-word;
        }

        .description {
          width: 674rpx;
          height: 80rpx;
          margin: 10rpx 20rpx;
          color: #b5b5b5;
          font-size: 22rpx;
          line-height: 32rpx;
          overflow: hidden;
          white-space: normal;
          /* 允许换行 */
          display: -webkit-box;
          /* 使用 flexbox 样式 */
          -webkit-box-orient: vertical;
          /* 垂直排列文本 */
          -webkit-line-clamp: 2;
          /* 限制显示的行数为2行，可以根据需要调整 */
        }
      }

      .tagProduct {
        position: absolute;
        bottom: 80rpx;
        width: 200rpx;
        height: 25rpx;
        line-height: 20rpx;
        margin-bottom: 6rpx;
        display: flex;
        gap: 10rpx;
        padding: 0 20rpx;

        .new {
          width: 40rpx;
          height: 22rpx;
          border: #ff007f 1px solid;
          border-radius: 7rpx;
          font-size: 20rpx;
          font-weight: bold;
          color: #ff007f;
          display: flex;
          justify-content: center;
          align-items: cneter;
          padding: 1rpx;
        }

        .only {
          width: 40rpx;
          height: 22rpx;
          border: #08d2ff 1px solid;
          border-radius: 7rpx;
          font-size: 20rpx;
          font-weight: bold;
          color: #08d2ff;
          display: flex;
          justify-content: center;
          align-items: cneter;
          padding: 1rpx;
        }
      }

      .more-info {
        position: absolute;
        bottom: 0rpx;
        width: 100%;

        .text {
          height: 30rpx;
          padding: 20rpx;
          line-height: 30rpx;
          font-size: 18rpx;
          color: #242424;
          border-top: 1rpx solid #b5b5b5;
        }
      }
    }

    .data-info {
      width: 150rpx;
      height: 100rpx;
      margin: 24rpx;
      position: absolute;
      top: 0rpx;
      right: 0rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 20rpx;
      color: dimgray;

      .rating,
      .stock,
      .sold {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2px;
      }

      .label {
        width: 150rpx;
      }

      .value {
        text-align: right;
      }
    }
  }


  .detail-container {
    margin: 20rpx 0;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .detail-section {
      width: 710rpx;
      height: auto;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: #fff;
      overflow: hidden;
    }

    .title {
      width: 100%;
      height: 40rpx;
      font-size: 30rpx;
      padding: 20rpx;
      border-bottom: #d1d1d1 1rpx solid;
    }

    .content {
      width: 680rpx;
      display: flex;
      flex-direction: column;
      padding: 20rpx;

      /* 垂直排列 */
      .item {
        display: flex;
        margin-bottom: 10px;
        /* 每个条目的间距 */
        align-items: center;
        /* 确保内容垂直居中 */
      }

      .label {
        margin-left: 20rpx;
        font-size: 28rpx;
        width: 200rpx;
        /* 设置 label 的宽度，确保它们对齐 */
        font-weight: bold;
        /* 让label部分加粗 */
        color: #666;
      }

      .value {
        font-size: 24rpx;
        flex: 1;
        /* 让value部分占满剩余空间 */
        color: #333;
        /* 设置value字体颜色 */
        text-align: left;
        /* value部分左对齐 */

      }
    }


  }
</style>
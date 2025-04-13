<template>
  <view class="container">
    <!-- 头部 -->
    <u-subsection :list="list" :current="curNow" @change="sectionChange" :animation="true" font-size="25rpx"
      :bold="true" active-color="black" inactive-color="gray" class="sub"></u-subsection>

    <view class="imgContainer">
      <image :src="product.info.imageUrl" mode="heightFix"></image>
    </view>

    <view class="info-container" v-if="product">
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
      </view>
    </view>
    <brandCard v-if="product" :brandId="product.info.brand_id"></brandCard>
    <view class="detail-container">
      <view class="detail-section">
        商品详情
      </view>
    </view>
    <u-tabbar placeholder>
      <u-button type="primary" text="立即购买"></u-button>
    </u-tabbar>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import brandCard from '../../components/brandCard/brandCard.vue'
  export default {
    data() {
      return {
        product_id: '',
        product: null,
        curNow: 0,

      }
    },
    components: {
      brandCard
    },
    computed: {
      ...mapState({
        list: (state) => state.productDetail.list
      })
    },
    onLoad(options) {
      this.product_id = options.productId
      this.fetchProductDetail(this.product_id)
    },
    mounted() {},
    methods: {
      async fetchProductDetail(product_id) {
        const res = await uniCloud.callFunction({
          name: 'getProductDetail',
          data: {
            product_id: product_id
          }
        })
        this.product = res.result.data
      },
      sectionChange() {

      }
    }
  }
</script>
<style scoped lang="scss">
  .container {
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
          font-size: 20rpx;
          color: #b5b5b5;
          border-top: 1rpx solid #b5b5b5;
        }
      }
    }
  }


  .detail-container {
    margin: 10rpx 0;
    width: 100%;
    height: 500rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .detail-section {
      width: 710rpx;
      height: 500rpx;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      background-color: #fff;
    }
  }
</style>
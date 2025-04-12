<template>
  <view>
    <!-- <view class="card2" :style="backgroundStyle"> -->
    <view class="card2" :style="backgroundStyle">
      <!-- <view class="titlemask" :class="{}"> -->
      <view class="titlemask" :style="titlemaskColor">
        <view class="title">
          全球趋势
        </view>
      </view>
      <scroll-view scroll-x="true" class="card-scroll" :style="boxShadow">
        <view class="card-scroll-child">
          <view v-for="product in cardProductsTransP" :key="product.product_id">
            <view class="card-products-transp">
              <view class="imgC">
                <image :src="product.transpImageUrl" mode="heightFix" class="img"></image>
              </view>
              <view class="title">{{product.name}}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "TransProductsCard",
    props: {
      pageType: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isLoading: false,
        cardProductsTransP: []
      };
    },
    computed: {
      // 根据pageType生成不同的背景色
      backgroundStyle() {
        let bgImageUrl = null;

        // 判断type值，并选择对应的颜色组
        if (this.pageType === 'makeup') {
          bgImageUrl = "https://lonsdaleite.oss-cn-beijing.aliyuncs.com/home/background/makeupBackground.webp";
        } else if (this.pageType === 'skincare') {
          bgImageUrl = "https://lonsdaleite.oss-cn-beijing.aliyuncs.com/home/background/skincareBg.jpg";
        } else if (this.pageType === 'bodycare') {
          bgImageUrl = "https://lonsdaleite.oss-cn-beijing.aliyuncs.com/home/background/bodycareBg.jpg";
        } else {
          bgImageUrl = "";
        }
        // 动态生成linear-gradient背景
        return `background-image: url('${bgImageUrl}');`;
      },
      titlemaskColor() {
        let titlemaskGradientColors = [];
        if (this.pageType === 'makeup') {
          titlemaskGradientColors = ['#ec85d1', '#ffcdfa', '#ffbbea', '#ffb0bc']
        } else if (this.pageType === 'skincare') {
          titlemaskGradientColors = ['#c0e1fd', '#d7efed', '#b9dbea', '#baeafb'];
        } else if (this.pageType === 'bodycare') {
          titlemaskGradientColors = ['#dfdf78', '#fdf8bf', '#e3e2bd', '#f5eac8'];
        } else {
          titlemaskGradientColors = ['#cffaf9', '#f4ffff', '#d6f8e3', '#bbf5d8'];
        }
        // 动态生成linear-gradient背景
        return `background: linear-gradient(0.3turn, ${titlemaskGradientColors.join(', ')});`;
      },
      boxShadow() {
        let shadowColor = null;
        // 判断type值，并选择对应的颜色组
        if (this.pageType === 'makeup') {
          shadowColor = `#bd6da5`;
        } else if (this.pageType === 'skincare') {
          shadowColor = `#c4e9fd`;
        } else if (this.pageType === 'bodycare') {
          shadowColor = '#fbfdcc';
        } else {
          shadowColor = '#cff0dd';
        }
        // 动态生成linear-gradient背景
        return `box-shadow: -5rpx 0 5rpx ${shadowColor};`;
      }
    },
    methods: {
      async fetchCardProductsTransP(pageType) {
        this.isLoading = true;
        this.error = null;
        try {
          // 调用云函数
          const result = await uniCloud.callFunction({
            name: 'getCardTranspProducts',
            data: {
              pageType: pageType
            }
          });
          if (result.result.code === 200) {
            this.cardProductsTransP = result.result.data || [];
            // console.log(this.cardProductsTransP)
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
    },
    mounted() {
      this.fetchCardProductsTransP(this.pageType).then(() => {
        // console.log("card2 data successful load")
      })
    }
  }
</script>

<style scoped lang="scss">
  .card2 {
    width: 725rpx;
    height: 260rpx;
    border-radius: 10rpx;
    background-size: cover;
    opacity: 0.9;

    .titlemask {
      float: left;
      width: 80rpx;
      height: 260rpx;
      border-radius: 10rpx 0 0 10rpx;
      display: flex;
      justify-content: center;

      .title {
        padding: 19rpx;
        writing-mode: vertical-rl;
        color: #ffffff;
        font-size: 28rpx;
        font-weight: 500;
        letter-spacing: 4px;
      }
    }

    .card-scroll {
      float: right;
      width: 645rpx;
      height: 260rpx;
      overflow-x: auto;
      white-space: nowrap;
      // box-shadow: -5rpx 0 10rpx #bd6da5;
    }

    .card-scroll-child {
      display: flex;
      flex-direction: row;
      padding: 10rpx;
    }

    .card-products-transp {
      width: 180rpx;
      height: 240rpx;
      // background-color: #fff2fc;
      position: relative;
      margin: 0 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .imgC {
        position: absolute;
        top: 0;
        // margin: 30rpx;
        width: 180rpx;
        height: 180rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          width: auto;
          height: 120rpx;
        }
      }


      .title {
        position: absolute;
        bottom: 0rpx;
        // width: 100%;
        height: 55rpx;
        font-size: 20rpx;
        margin: 10rpx;
        // color: #fff2fc;
        color: #000000;
        font-weight: 400;
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
  }
</style>
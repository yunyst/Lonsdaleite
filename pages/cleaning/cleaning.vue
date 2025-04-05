<template>
  <view>
    <!-- 2. Banner 轮播图 -->
    <swiper class="swiper" autoplay circular indicator-dots>
      <swiper-item v-for="banner in bannerList" :key="banner.id">
        <image :src="banner.image" class="swiper-image" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>


    <!-- 3. 分类图标 -->
    <view class="icon-grid">
      <view v-for="(icon, index) in iconList" :key="index" class="icon-item">
        <image :src="icon.img" class="icon-img" mode="widthFix"></image>
        <text class="icon-title">{{ icon.title }}</text>
      </view>
    </view>

    <!-- 4. 五大板块 -->
    <view class="section-wrap" v-for="(section, sIndex) in sections" :key="sIndex">
      <!-- 板块标题 -->
      <view class="section-title">{{ section.title }}</view>
      <!-- 板块内容 - 商品列表 -->
      <scroll-view scroll-x="true" class="product-scroll">
        <view class="product_scroll-child">
          <view v-for="(product, pIndex) in section.products" :key="pIndex">
            <ProductCard :product="product" @goProductDetail="goProductDetail" />
          </view>
        </view>

      </scroll-view>
    </view>


    <!-- 5. 全部商品（下拉加载/上拉加载） -->
    <view class="product-grid">
      <view class="all-goods-title">全部商品</view>
      <!-- grid -->
      <!-- <view class="goods-grid">
        <view class="goods-card" v-for="good in allGoods" :key="good.id">
          <AllGoodsCard :good="good" @goProductDetail="goProductDetail"></AllGoodsCard>
        </view>
      </view> -->
      <!-- 使用瀑布流布局 -->
      <view class="goods-grid">
        <view class="goods-column" v-for="(column, cIndex) in columns" :key="cIndex">
          <view class="goods-card" v-for="(good, gIndex) in column" :key="good.id">
            <AllGoodsCard :good="good" @goProductDetail="goProductDetail"></AllGoodsCard>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
      <u-load-more :status="loadMoreStatus" @load-more="loadMoreGoods"></u-load-more>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style>

</style>
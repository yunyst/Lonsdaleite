<template>
  <view class="home-container">
    <!-- 顶部分类栏 -->
    <!-- <view class="tab-bar">
      <scroll-view scroll-x class="tab-scroll" :scroll-into-view="activeCategory" :scroll-with-animation="true">
        <view v-for="(item, index) in categoryTabs" :key="index" class="tab-item"
          :class="{ active: activeCategory === item.value }" @click="onCategoryClick(item.value)">
          {{ item.label }}
        </view>
      </scroll-view>
    </view> -->
    <HomeTabBar :categoryTabs="categoryTabs" />
    <!-- 内容区域：根据 activeCategory 条件渲染内容 -->
    <view class="category-content">
      <CleaningContent v-if="activeCategory === 'cleaning'" />
      <MakeupContent v-else-if="activeCategory === 'makeup'" />
      <SkincareContent v-else-if="activeCategory === 'skincare'" />
      <FragranceContent v-else-if="activeCategory === 'fragrance'" />
      <BodycareContent v-else-if="activeCategory === 'bodycare'" />

      <!-- 可以继续添加其他分类 -->
    </view>
  </view>
</template>

<script>
  import tabMixin from '../../mixins/tabMixin.js'
  import HomeTabBar from '../../components/HomeTabBar/HomeTabBar'
  import CleaningContent from '@/pages/cleaning/cleaning.vue'
  import MakeupContent from '@/pages/makeup/makeup.vue'
  import SkincareContent from '@/pages/skincare/skincare.vue'
  import FragranceContent from '@/pages/fragrance/fragrance.vue'
  import BodycareContent from '@/pages/bodycare/bodycare.vue'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [tabMixin],
    components: {
      HomeTabBar,
      CleaningContent,
      MakeupContent,
      SkincareContent,
      FragranceContent,
      BodycareContent
    },
    data() {
      return {
        isLoading: false,
      }
    },
    computed: {
      ...mapState({
        activeCategory: state => state.home.activeCategory,
        // 分类栏
        categoryTabs: state => state.home.categoryTabs,
      }),
      // 根据 activeCategory 选择对应的组件名称
      onTabChange() {}
    },
    methods: {},
    mounted() {}
  }
</script>

<style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
  }

  /* 分类栏 */
  .tab-bar {
    background-color: #fff;
    overflow: hidden;
    height: 90rpx;
    display: flex;
    align-items: center;
  }

  .tab-scroll {
    white-space: nowrap;
  }

  .tab-item {
    display: inline-block;
    padding: 0 30rpx;
    line-height: 90rpx;
    font-size: 28rpx;
    color: #333;
  }

  .tab-item.active {
    color: #000000;
    font-weight: bold;
    border-bottom: 2rpx solid #000000;
  }
</style>
<template>
  <view class="tab-bar">
    <scroll-view scroll-x class="tab-scroll">
      <view v-for="(item, index) in categoryTabs" :key="index" class="tab-item"
        :class="{ active: activeCategory === item.value }" @click="handleClick(item.value, index)">
        {{ item.label }}
        <view v-if="activeCategory === item.value" class="tab-underline"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    props: {
      categoryTabs: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapState({
        activeCategory: state => state.home.activeCategory
      })
    },
    methods: {
      ...mapActions(['updateCategory']),
      handleClick(value, index) {
        this.updateCategory(value)
        this.$emit('tabChange', value)
      }
    }
  }
</script>

<style scoped>
  .tab-scroll {
    white-space: nowrap;
    display: flex;
  }

  .tab-item {
    display: inline-block;
    padding: 20rpx;
    font-size: 28rpx;
    position: relative;
  }

  .tab-item.active {
    color: #000;
    font-weight: bold;
  }

  .tab-underline {
    width: 60rpx;
    height: 6rpx;
    background-color: #000;
    border-radius: 3rpx;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
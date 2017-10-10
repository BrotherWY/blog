<template>
  <div class="archive-item">
    <time-title></time-title>
    <div class="content">
      <div class="circle" :style="{background: getColor}"></div>
      <article-title></article-title>
      <article-title></article-title>
      <article-title></article-title>
      <article-title></article-title>
      <article-title></article-title>
      <article-title></article-title>
      <article-title></article-title>
    </div>
  </div>
</template>

<script>
import TimeTitle from '@/pages/archive/components/TimeTitle';
import ArticleTitle from '@/pages/archive/components/ArticleTitle';

export default {
  data() {
    return {

    };
  },
  components: {
    'time-title': TimeTitle,
    'article-title': ArticleTitle,
  },
};
</script>

<style lang="scss" scoped>
  .archive-item {
    width: 100%;
    display: flex;
  }

  .content {
    border-left: 1px solid #d5d5d5;
    position: relative;
    padding: 16px 0;
    margin-left: 16px;
  }

  .circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    left: -8px;
    top: -8px;
  }

   @media (max-width: 750px) {
    .content {
      margin-left: 8px;
    }
  }
</style>


<template>
  <div class="article-item">
    <div class="top">
      <img class="img" :src="article.cover"/>
      <div class="content-wrapper">
        <h1 class="title ellipsis">{{article.title}}</h1>
        <div class="content">{{article.content}}</div>
        <div class="list">
          <span class="time">{{article.date}}</span>
          <function v-for="(func, i) in article.funcs" :key="i" :func="func"></function>
        </div>
      </div>
    </div>
    <div class="tags">
      <tag v-for="(tag, i) in article.tags" :key="i" :name="tag"></tag>
    </div>
  </div>
</template>

<script>
import Tag from '@/pages/home/components/ArticleTag';
import Function from '@/pages/home/components/Function';

export default {
  props: {
    article: {},
  },
  data() {
    return {
    };
  },
  components: {
    'tag': Tag,
    'function': Function,
  },
};
</script>

<style lang="scss" scoped>
  .article-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding-top: 12px;
    margin-top: 16px;
  }

  .article-item:first-child {
    margin-top: 0;
  }

  .top {
    display: flex;
    flex-direction: row;
  }

  .img {
    width: 120px;
    height: 120px;
    margin-left: 16px;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 16px;
  }

  .title {
    width: 500px;
    height: 32px;
    font-size: 18px;
    cursor: pointer;
    color: #333;
  }

  .title:hover {
    text-decoration: underline;
  }  

  .content {
    min-height: 40px;
    font-size: 14px;
    color: #666;
  }

  .list {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  .tags {
    justify-content: flex-start;
    margin: 8px 16px;
    overflow: hidden;
  }

  .time {
    font-size: 14px;
    color: #8492A6;
  }

  @media (max-width: 1300px) {
    .img {
      width: 60px;
      height: 60px;
      margin: 0 0 0 8px;
    }

    .content {
      font-size: 12px;
      min-height: 20px;
    }

    .title {
      width: 200px;
      height: 20px;
      font-size: 14px;
    }

    .list {
      margin-top: 4px;
      height: 16px;
    }

    .tags {
      margin: 8px 8px;
    }

    .time {
      font-size: 12px;
    }
  }
</style>
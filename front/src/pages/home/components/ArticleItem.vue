<template>
  <div class="article-item">
    <img class="img" src="http://wenwen.soso.com/p/20110106/20110106102235-195726459.jpg"/>
    <div class="content-wrapper">
      <h1 class="title ellipsis">今天天气大好啊！！！！今天天气大好啊！！！！今天天气大好啊！！！！今天天气大好啊！！！！今天天气大好啊！！！！</h1>
      <div class="content">今天天气大好啊！！！！今天天气大好啊！今天天气大好啊！！！！</div>
      <div class="list">
        <span class="time">2017-09-29 10:00</span>
        <function v-for="(func, i) in funcs" :key="i" :func="func"></function>
      </div>
      <div class="list tags">
        <tag v-for="(tag, i) in tags" :key="i" :name="tag"></tag>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/pages/home/components/ArticleTag';
import Function from '@/pages/home/components/Function';

export default {
  data() {
    return {
      funcs: [
        {
          icon: 'wy-faxian',
          count: 1000,
        },
        {
          icon: 'wy-pinglun',
          count: 1000,
        },
        {
          icon: 'wy-iconfontzhuanfa',
          count: 1000,
        },
      ],
      tags: ['react', 'vue', 'react-native'],
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
    min-height: 130px;
    display: flex;
    background: #fff;
    padding-top: 12px;
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

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .list {
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .tags {
    justify-content: flex-start;
    margin-top: 8px;
  }

  .time {
    font-size: 14px;
    color: #8492A6;
    flex: 1;
  }

  @media (max-width: 1300px) {
    .skeleton {
      min-height: 120px;
    }

    .img {
      width: 90px;
      height: 90px;
      margin: 0 0 0 8px;
    }

    .item {
      height: 16px;
    }

  }
</style>
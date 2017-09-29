<template>
  <div class="article-item">
    <div class="top">
      <img class="img" src="http://wenwen.soso.com/p/20110106/20110106102235-195726459.jpg"/>
      <div class="content-wrapper">
        <h1 class="title ellipsis">今天天气大好啊！！！！今天天气大好啊！！！！今天天气大好啊！！！！今天天气大好啊！！！！今天天气大好啊！！！！</h1>
        <div class="content">今天天气大好啊！！！！今天天气大好啊！今天天气大好啊！！！！</div>
      </div>
    </div>
    <div class="list">
      <span class="time">2017-09-29 10:00</span>
      <function v-for="(func, i) in funcs" :key="i" :func="func"></function>
    </div>
    <div class="tags">
      <tag v-for="(tag, i) in tags" :key="i" :name="tag"></tag>
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
      tags: ['react', 'vue', 'react-native', 'react', 'vue', 'react-native'],
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
    flex-direction: column;
    background: #fff;
    padding-top: 12px;
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
    margin: 0 16px;
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
    .article-item {
      min-height: 120px;
    }

    .img {
      width: 60px;
      height: 60px;
      margin: 0 0 0 8px;
    }

    .title {
      width: 200px;
      height: 20px;
      font-size: 16px;
      cursor: pointer;
      color: #333;
    }

    .list {
      margin: 0 8px;
    }

    .tags {
      margin: 0 8px;
    }
  }
</style>
<template>
  <div class="container">
    <div class="wrapper mt16">
      <div class="left">
        <profile v-if="getUserInfo&&getUserInfo.user" :userInfo="getUserInfo"></profile>
        <skeleton-profile v-else></skeleton-profile>
      </div>
      <div class="center">
        <div v-if="getArticles&&getArticles.length>0">
          <article-item  v-for="(article, i) in getArticles" :key="i" :article="article"></article-item>
        </div>
        <div v-else>
          <skeleton-article-item></skeleton-article-item>
          <skeleton-article-item></skeleton-article-item>
        </div>
      </div>
      <div class="right ml16">
        <tag-wrapper v-if="getTags&&getTags.length>0" :tags="getTags" ></tag-wrapper>
        <skeleton-tag v-else></skeleton-tag>
        <recent v-if="getRecents&&getRecents.length>0" :recents="getRecents"></recent>
        <skeleton-recent v-else></skeleton-recent>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from '@/components/Footer';
import homeStoreModule from '@/store/modules/home';
import Recent from '@/pages/home/components/Recent';
import Profile from '@/pages/home/components/Profile';
import TagWrapper from '@/pages/home/components/TagWrapper';
import SkeletonTag from '@/components/skeleton/SkeletonTag';
import ArticleItem from '@/pages/home/components/ArticleItem';
import SkeletonRecent from '@/components/skeleton/SkeletonRecent';
import SkeletonProfile from '@/components/skeleton/SkeletonProfile';
import SkeletonArticleItem from '@/components/skeleton/SkeletonArticleItem';

export default {
  asyncData({ store }) {
    store.registerModule('home', homeStoreModule);
    return store.dispatch('home/FETCH_INDEX');
  },
  data() {
    return {
    };
  },
  methods: {

  },
  computed: {
    getTags() {
      return this.$store.state.home.tags;
    },
    getUserInfo() {
      return this.$store.state.home.userInfo;
    },
    getArticles() {
      return this.$store.state.home.articles;
    },
    getRecents() {
      return this.$store.state.home.hots;
    },
  },
  created() {
    this.setTitleMixin('首页');
  },
  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  destroyed() {
    this.$store.unregisterModule('home');
  },
  components: {
    'recent': Recent,
    'profile': Profile,
    'footer-bar': FooterBar,
    'tag-wrapper': TagWrapper,
    'skeleton-tag': SkeletonTag,
    'article-item': ArticleItem,
    'skeleton-recent': SkeletonRecent,
    'skeleton-profile': SkeletonProfile,
    'skeleton-article-item': SkeletonArticleItem,
  },
};
</script>

<style lang="scss" scoped>
  .left {
    width: 300px;
  }

  .center {
    flex: 1;
    margin-left: 16px;
  }

  .right {
    width: 300px;
  }

  @media (max-width: 1300px) {
    .left {
      display: none;
    }
    
    .center {
      margin-left: 0;
    }
  }

  @media (max-width: 750px) {
    .right {
      display: none;
    }
  }
</style>

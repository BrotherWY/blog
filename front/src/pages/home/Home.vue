<template>
  <div class="container">
    <!-- <header-bar v-if="getMenus.length>0" :menus="getMenus"></header-bar> -->
    <skeleton-heder></skeleton-heder>
    <div class="wrapper mt16">
      <div class="left">
        <profile></profile>
        <!-- <skeleton-profile></skeleton-profile> -->
      </div>
      <div class="center">
        <!-- <skeleton-article-item></skeleton-article-item> -->
        <article-item></article-item>
      </div>
      <div class="right ml16">
        <!-- <skeleton-tag></skeleton-tag> -->
        <!-- <skeleton-recent></skeleton-recent> -->
        <tag-wrapper></tag-wrapper>
        <recent></recent>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/Header';
import FooterBar from '@/components/Footer';
import homeStoreModule from '@/store/modules/home';
import Recent from '@/pages/home/components/Recent';
import Profile from '@/pages/home/components/Profile';
import TagWrapper from '@/pages/home/components/TagWrapper';
import SkeletonTag from '@/components/skeleton/SkeletonTag';
import ArticleItem from '@/pages/home/components/ArticleItem';
import SkeletonHeader from '@/components/skeleton/SkeletonHeader';
import SkeletonRecent from '@/components/skeleton/SkeletonRecent';
import SkeletonProfile from '@/components/skeleton/SkeletonProfile';
import SkeletonArticleItem from '@/components/skeleton/SkeletonArticleItem';

export default {
  asyncData({ store }) {
    store.registerModule('home', homeStoreModule);
    return store.dispatch('home/FETCH_MENUS');
  },
  data() {
    return {
      menus: [],
    };
  },
  methods: {

  },
  computed: {
    getMenus() {
      return this.$store.state.home.menus;
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
    'header-bar': HeaderBar,
    'footer-bar': FooterBar,
    'tag-wrapper': TagWrapper,
    'skeleton-tag': SkeletonTag,
    'article-item': ArticleItem,
    'skeleton-heder': SkeletonHeader,
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

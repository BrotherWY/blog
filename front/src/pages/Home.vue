<template>
  <div class="container">
    <top-bar :menus="getMenus"></top-bar>
    <div class="wrapper mt16">
      <div class="center">
        
      </div>
      <div class="right ml16">

      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import FooterBar from '@/components/Footer';
import homeStoreModule from '@/store/modules/home';

export default {
  asyncData({ store }) {
    store.registerModule('home', homeStoreModule);
    return store.dispatch('home/FETCH_MENUS');
  },
  data() {
    return {};
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
    'top-bar': TopBar,
    'footer-bar': FooterBar,
  },
};
</script>

<style lang="scss" scoped>
  .center {
    flex: 1;
    height: 500px;
    background: #fff;
  }

  .right {
    width: 300px;
    height: 500px;
    background: #fff;
  }

  @media (max-width: 1000px) {
    .right {
      display: none;
    }
  }
</style>

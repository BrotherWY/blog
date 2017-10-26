<template>
  <div id="app">
    <header-bar v-if="header.menus&&header.menus.length>0" :data="header"></header-bar>
    <skeleton-heder v-else></skeleton-heder>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderBar from '@/components/Header';
import HttpClient from '@/network/HttpClientPromise';
import SkeletonHeader from '@/components/skeleton/SkeletonHeader';

export default {
  data() {
    return {
      header: {},
    };
  },
  methods: {
    fetchHeader() {
      HttpClient.get('/1.0/index/header').then((data) => {
        this.header = data;
      });
    },
  },
  created() {
    this.fetchHeader();
  },
  components: {
    'header-bar': HeaderBar,
    'skeleton-heder': SkeletonHeader,
  },
};
</script>

<style lang="scss">
  @import './styles/reset.scss';
  @import './styles/common.scss';
  #app {
    width: 100%;
    min-height: 100%;
    background: #F7F7F7;
    display: flex;
    flex-direction: column;
  }
</style>




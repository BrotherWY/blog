<template>
  <div class="container">
    <top-bar></top-bar>
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
import HttpClient from '@/network/HttpClientPromise';

export default {
  data() {
    return {

    };
  },
  created() {
    if (this.$ssrContext) this.$ssrContext.title = '首页';
    HttpClient.self = this;
    // 发送请求
    HttpClient.get('/menu')
    .then((data) => {
      console.log(data);
    })
    .catch(() => {

    });
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

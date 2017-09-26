<template>
  <div class="container">
    <top-bar></top-bar>
    <div class="wrapper mt16">
      <div class="center">

      </div>
      <div class="right ml16">

      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';

export default {
  data() {
    return {

    };
  },
  components: {
    'top-bar': TopBar,
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 1100px;
    display: flex;
  }

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
</style>

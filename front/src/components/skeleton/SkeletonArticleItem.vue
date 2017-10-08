<template>
  <div class="skeleton">
    <div class="skeleton-img skeleton-bg"></div>
    <div class="skeleton-content">
      <div class="skeleton-item w30 skeleton-bg"></div>
      <div class="skeleton-item w90 mt8 skeleton-bg"></div>
      <div class="skeleton-item w60 skeleton-bg"></div>
      <div class="skeleton-item w50 mt8 skeleton-bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
  .skeleton {
    width: 100%;
    min-height: 150px;
    display: flex;
    background: #fff;
    margin-top: 16px;
    padding-top: 12px;
  }

  .skeleton:first-child {
    margin-top: 0;
  }

  .skeleton-img {
    width: 120px;
    height: 120px;
    margin: 0 0 0 16px;
  }

  .skeleton-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 16px;
  }

  .skeleton-item {
    height: 24px;
  }

  .w30 {
    width: 30%;
  }

  .w90 {
    width: 90%;
  }

  .w60 {
    width: 60%;
  }

  .w50 {
    width: 50%;
  }

  .skeleton-item:first-child{
    margin-top: 0;
  }


  @media (max-width: 1300px) {
    .skeleton {
      min-height: 90px;
    }

    .skeleton-img {
      width: 60px;
      height: 60px;
      margin: 0 0 0 8px;
    }

    .skeleton-item {
      height: 16px;
    }

  }
</style>
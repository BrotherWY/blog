<template>
  <div class="skeleton mt16">
    <div class="skeleton-title">
      <div class="title skeleton-bg ml8"></div>
    </div>
    <div class="skeleton-articles">
      <div class="skeleton-article skeleton-bg w30"></div>
      <div class="skeleton-article skeleton-bg w90"></div>
      <div class="skeleton-article skeleton-bg w60"></div>
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
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
  }

  .skeleton-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .title {
    width: 50%;
    height: 25px;
  }

  .skeleton-articles {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .skeleton-article {
    height: 20px;
    margin-left: 8px;
    margin-top: 12px;
  }

  .w30 {
    width: 30%;
  }

  .w60 {
    width: 60%;
  }

  .w90 {
    width: 90%;
  }
</style>


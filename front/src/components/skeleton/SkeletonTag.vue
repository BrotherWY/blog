<template>
  <div class="skeleton">
    <div class="skeleton-title">
      <div class="title skeleton-bg ml8"></div>
    </div>
    <div class="skeleton-tags">
      <div class="skeleton-tag skeleton-bg"></div>
      <div class="skeleton-tag skeleton-bg"></div>
      <div class="skeleton-tag skeleton-bg"></div>
      <div class="skeleton-tag skeleton-bg"></div>
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
    min-height: 100px;
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

  .skeleton-tags {
    width: 100%;
    overflow: hidden;
  }

  .skeleton-tag {
    width: 65px;
    height: 30px;
    border-radius: 15px;
    float: left;
    margin-left: 8px;
    margin-top: 16px;
  }
</style>


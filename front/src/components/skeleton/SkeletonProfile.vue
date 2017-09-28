<template>
  <div class="skeleton">
    <div class="skeleton-icon skeleton-bg mt32"></div>
    <div class="skeleton-name skeleton-bg mt24"></div>
    <div class="skeleton-job skeleton-bg mt8"></div>
    <div class="skeleton-follow skeleton-bg mt24"></div>
    <div class="skeleton-summary mt16">
      <div class="summary-wrapper">
        <div class="summary-item skeleton-bg"></div>
        <div class="summary-item skeleton-bg mt8"></div>
      </div>
      <div class="summary-wrapper">
        <div class="summary-item skeleton-bg"></div>
        <div class="summary-item skeleton-bg mt8"></div>
      </div>
      <div class="summary-wrapper">
        <div class="summary-item skeleton-bg"></div>
        <div class="summary-item skeleton-bg mt8"></div>
      </div>
    </div>
    <div class="skeleton-contacts mt16">
      <div class="item-wrapper">
        <div class="item skeleton-bg"></div>
      </div>
      <div class="item-wrapper">
        <div class="item skeleton-bg"></div>
      </div>
      <div class="item-wrapper">
        <div class="item skeleton-bg"></div>
      </div>
      <div class="item-wrapper">
        <div class="item skeleton-bg"></div>
      </div>
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
    height: 477px;
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
  }

  .skeleton-icon {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  .skeleton-name {
    width: 50%;
    height: 27px;
  }

  .skeleton-job {
    width: 35%;
    height: 19px;
  }

  .skeleton-follow {
    width: 150px;
    height: 40px;
    border-radius: 20px;
  }

  .item-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .skeleton-summary {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .summary-wrapper {
    flex: 1;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .summary-item {
    width: 50%;
    height: 20px;
  }

  .skeleton-contacts {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .item {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

</style>
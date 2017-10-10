<template>
  <div class="title">
    <div class="time">2017年10月</div>
    <div class="line" :style="{background: getColor}"></div>
    <div class="count" :style="{background: getColor}">20</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  .title {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }

  .line {
    width: 2px;
    height: 32px;
  }

  .count {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
  }

  @media (max-width: 750px) {
    .title {
      width: 80px;
      min-width: 80px;
    }
    
    .time {
      font-size: 13px;
    }

    .line {
      height: 24px;
    }

    .count {
      width: 20px;
      height: 20px;
      font-size: 12px;
    }
  }
</style>


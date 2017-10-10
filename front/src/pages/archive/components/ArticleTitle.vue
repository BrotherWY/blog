<template>
  <div class="title">
    <p class="content ellipsis">无敌大火车无敌大火车无敌大火车无敌大火车无敌大火车无敌大火车无敌大火车</p>
    <p class="time">2017-10-10</p>
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
  .title {
    flex: 1;
    display: flex;
  }

  .content {
    height: 28px;
    line-height: 28px;
    font-size: 17px;
    color: #2479cc;
    margin-left: 16px;
    cursor: pointer;
  }

  .content:hover {
    text-decoration: underline;
  }

  .time {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #999;
    margin-left: 8px;
  }

  @media (max-width: 750px) {
    .content {
      width: 160px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      margin-left: 8px;
    }

    .time {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      margin-left: 0;
    }
  }
</style>


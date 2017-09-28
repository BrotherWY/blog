<template>
  <div class="articleItem">
    <img class="img" src="http://wenwen.soso.com/p/20110106/20110106102235-195726459.jpg"/>
    <div class="content">
      <div class="item"></div>
      <div class="item w90 mt8 bg"></div>
      <div class="item w60 bg"></div>
      <div class="item w50 mt8 bg"></div>
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
  .articleItem {
    width: 100%;
    min-height: 150px;
    display: flex;
    background: #fff;
    align-items: center;
  }

  .img {
    width: 120px;
    height: 120px;
    margin: 0 0 0 16px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 16px;
  }

  .item {
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

  .item:first-child{
    margin-top: 0;
  }


  @media (max-width: 1300px) {
    .skeleton {
      min-height: 120px;
    }

    .img {
      width: 90px;
      height: 90px;
      margin: 0 0 0 8px;
    }

    .item {
      height: 16px;
    }

  }
</style>
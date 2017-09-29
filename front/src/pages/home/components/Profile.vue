<template>
  <div class="profile">
    <img class="avatar mt32" src="http://wenwen.soso.com/p/20110106/20110106102235-195726459.jpg" alt="avatar">
    <h1 class="name mt24">BrotherWang</h1>
    <h3 class="job mt8">技术人</h3>
    <p class="follow mt24">关注一波</p>
    <div class="summary mt16">
      <div class="summary-wrapper">
        <div class="summary-item">文章</div>
        <div class="summary-item mt8">100</div>
      </div>
      <div class="summary-wrapper">
        <div class="summary-item bg">标签</div>
        <div class="summary-item mt8">20</div>
      </div>
      <div class="summary-wrapper">
        <div class="summary-item bg">分类</div>
        <div class="summary-item mt8">30</div>
      </div>
    </div>
    <div class="contacts">
      <div class="item">
        <span class="icon iconfont wy-github" title="github"></span>
      </div>
      <div class="item">
        <span class="icon iconfont wy-github" title="github"></span>
      </div>
      <div class="item">
        <span class="icon iconfont wy-github" title="github"></span>
      </div>
      <div class="item">
        <span class="icon iconfont wy-github" title="github"></span>
      </div>
      <div class="item">
        <span class="icon iconfont wy-github" title="github"></span>
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
  .profile {
    width: 100%;
    height: 440px;
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  .name {
    height: 27px;
    line-height: 27px;
    font-size: 16px;
  }

  .job {
    height: 19px;
    line-height: 19px;
    font-size: 15px;
  }

  .follow {
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
    background: #4B8DFA;
    color: #fff;
    cursor: pointer;
  }

  .follow:hover {
    background: #619dff;
  }

  .summary {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    border-top: 1px solid #eae2e2;
    border-bottom: 1px solid #eae2e2;
  }

  .summary-wrapper {
    flex: 1;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #eae2e2;
  }

  .summary-wrapper:first-child {
    border-left: none;
  }

  .summary-item {
    width: 50%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .contacts {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .item {
    flex: 1;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .icon {
    font-size: 25px;
  }

</style>
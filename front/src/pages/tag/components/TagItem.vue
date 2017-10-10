<template>
  <div class="tag-item">
    <div class="bar" :style="{background: getColor}"></div>
    <div class="content">
      <p class="name">react</p>
      <p class="content-text">&nbsp;&nbsp;react is open source project from facebook!</p>
    </div>
    <div class="footer">
      <p class="text"><span class="icon iconfont wy-wenzhang" title="文章数量"></span>10</p>
      <p class="text"><span class="icon iconfont wy-time" title="创建时间"></span>2017-10-10 09:10</p>
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
  .tag-item {
    width: 200px;
    height: 150px;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    float: left;
    margin-left: 16px;
    margin-top: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.05);
    cursor: pointer;
  }

  .tag-item:hover {
    box-shadow: 5px 10px 10px rgba(0,0,0,0.05), -5px 10px 10px rgba(0,0,0,0.05);
  }

  .bar {
    width: 100%;
    height: 16px;
  }

  .content {
    flex: 1;
    padding: 8px;
  }

  .content-text {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
  }

  .name {
    font-size: 18px;
    color: #333;
  }

  .footer {
    height: 24px;
    width: 100%;
    display: flex;
  }

  .text {
    font-size: 12px;
    color: #c2c2c2;
    margin-left: 8px;
  }

  .icon {
    font-size: 12px;
  }

  @media (max-width: 750px) {
    .tag-item {
      width: 45.5%;
      margin-left: 3%;
      height: 100px;
      border-radius: 4px;
    }

    .content {
      padding: 4px;
    }

    .content-text {
      font-size: 12px;
      margin-top: 0;
    }

    .name {
      font-size: 14px;
    }

    .text {
      margin-left: 4px;
    }
  }

</style>


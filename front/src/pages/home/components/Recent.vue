<template>
  <div class="recent mt16">
    <div class="title-wrapper">
      <div class="title bg ml8">推荐文章</div>
    </div>
    <div class="articles">
      <div class="article" v-for="(recent,i) in recents" :key="i">
        <p class="text ellipsis">{{recent.title}}</p>
        <span class="time">{{formatTime(recent.createdAt)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recents: {},
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
  .recent {
    width: 100%;
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
  }

  .title-wrapper {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .title {
    width: 50%;
    height: 25px;
    font-size: 16px;
  }

  .articles {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .article {
    height: 25px;
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .text {
    width: 62%;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }

  .text:hover {
    text-decoration: underline;
  }

  .time {
    font-size: 12px;
    color: #999;
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


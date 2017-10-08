<template>
  <div class="function">
      <span :class="['icon iconfont', func.icon]"></span>
      <span class="text">{{func.count}}</span>
   </div>
</template>

<script>
export default {
  props: {
    func: {
      default: {},
    },
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
  .function {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-left: 16px;
  }

  .icon {
    font-size: 14px;
    color: #8492A6;
  }

  .text {
    font-size: 14px;
    color: #8492A6;
    margin-left: 3px;
  }

</style>


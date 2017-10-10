<template>
  <div class="tag" :style="{color: getColor}">
      <span class="icon iconfont wy-biaoqian"></span>
      <span class="text">{{name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
  .tag {
    float: left;
    margin-right: 16px;
  }

  .icon {
    font-size: 14px;
  }

  .text {
    font-size: 14px;
    margin-left: 5px;
  }

  @media (max-width: 1300px) {
    .tag {
      margin-right: 8px;
    }

     .icon {
      font-size: 12px;
    }

    .text {
      font-size: 12px;
    }
  }
</style>


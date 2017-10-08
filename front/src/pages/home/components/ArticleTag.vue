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
      colors: ['#7AC9D5', '#9C59C4', '#76CD75', '#76D1C7', '#D76B85', '#CC8C7A', '#8E78CB', '#8077D2', '#6FD191'],
    };
  },
  computed: {
    getColor() {
      return this.colors[Math.floor(Math.random() * 9)];
    },
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


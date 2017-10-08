<template>
  <div class="tag" :style="{background: getColor}">
    <span class="text">{{tag.name}}</span>
    <badge :count="tag.count"></badge>
  </div>
</template>

<script>
import Badge from '@/components/Badge';

export default {
  props: {
    tag: {},
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
  components: {
    'badge': Badge,
  },
};
</script>

<style lang="scss" scoped>
  .tag {
    padding: 0 12px;
    height: 26px;
    line-height: 26px;
    border-radius: 15px;
    float: left;
    margin-left: 8px;
    margin-top: 12px;
    text-align: center;
    position: relative;
    opacity: 0.8;
    cursor: pointer;
  }

  .text {
    color: #fff;
    font-size: 14px;
  }
</style>


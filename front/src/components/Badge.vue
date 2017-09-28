<template>
  <div class="badge">{{getCount}}</div>
</template>

<script>
export default {
  props: {
    count: {
      default: 0,
    },
  },
  computed: {
    getCount() {
      return this.count > 99 ? '99+' : this.count;
    },
  },
};
</script>

<style lang="scss" scoped>
  .badge {
    position: absolute;
    top: -10px;
    right: -5px;
    background: red;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
    opacity: 0.8;
  }

  .badge:hover{
    opacity: 0.4;
  }
</style>


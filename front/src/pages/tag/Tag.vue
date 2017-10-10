<template>
  <div class="container">
    <div class="wrapper mt16">
      <h1 class="title">标签</h1>
      <div class="content">
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
        <tag-item></tag-item>
      </div>
    </div>
  </div>
</template>

<script>
import TagItem from '@/pages/tag/components/TagItem';

export default {
  data() {
    return {

    };
  },
  components: {
    'tag-item': TagItem,
  },
};
</script>

<style lang="scss" scoped>
  .title {
    width: 100%;
    text-align: left;
  }

  .wrapper {
    flex-direction: column;
  }

  .content {
    width: 100%;
  }

</style>


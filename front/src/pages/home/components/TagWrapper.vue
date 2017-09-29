<template>
  <div class="tag-wrapper">
    <div class="title-wrapper">
      <div class="title ml8">标签</div>
    </div>
    <div class="tags">
      <tag v-for="(tag, i) in tags" :key="i" :tag="tag"></tag>
    </div>
  </div>
</template>

<script>
import Tag from '@/pages/home/components/Tag';

export default {
  props: {
    tags: {
      default: () => {
        return [
          {
            name: 'react',
            count: 10,
          },
          {
            name: '技术',
            count: 100,
          },
          {
            name: 'vue',
            count: 1000,
          },
          {
            name: 'android',
            count: 10,
          },
          {
            name: 'weex',
            count: 10,
          },
        ];
      },
    },
  },
  data() {
    return {

    };
  },
  components: {
    'tag': Tag,
  },
};
</script>

<style lang="scss" scoped>
  .tag-wrapper {
    width: 100%;
    min-height: 100px;
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
  }

  .tags {
    width: 100%;
  }

</style>


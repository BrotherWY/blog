<template>
  <div class="container">
    <div class="wrapper mt16">
      <h1 class="title">归档</h1>
      <archive-item></archive-item>
      <archive-item></archive-item>
      <archive-item></archive-item>
      <archive-item></archive-item>
      <archive-item></archive-item>
    </div>
  </div>
</template>

<script>
import ArchiveItem from '@/pages/archive/components/ArchiveItem';

export default {
  data() {
    return {

    };
  },
  components: {
    'archive-item': ArchiveItem,
  },
};
</script>

<style lang="scss" scoped>
  .title {
    padding-bottom: 16px;
  }

  .wrapper {
    flex-direction: column;
  }

   @media (max-width: 750px) {
    .title {
      padding-left: 8px;
      padding-bottom: 16px;
      font-size: 18px;
    }
  }
</style>


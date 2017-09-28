<template>
  <header class="skeleton">
    <div class="skeleton-bar wrapper">
      <h1 class="logo-wrapper">
        <div class="logo skeleton-bg"></div>
      </h1>
      <div class="skeleton-items">
        <div class="skeleton-item skeleton-bg"></div>
        <div class="skeleton-item skeleton-bg"></div>
        <div class="skeleton-item skeleton-bg"></div>
        <div class="skeleton-item skeleton-bg"></div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    logo: {
      default: '',
    },
    menus: {},
  },
  data() {
    return {

    };
  },
};

</script>

<style lang="scss" scoped>
  $height: 50px;
  .skeleton {
    width: 100%;
    height: $height;
    background: #fff;
    display: flex;
    justify-content: center;
  }

  .skeleton-bar {
    flex-direction: row;
    align-items: center;
  }

  .logo-wrapper {
    flex: 1;
  }

  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .skeleton-items {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .skeleton-item {
    width: 30px;
    height: 20px;
    margin-left: 40px;
  }

  @media (max-width: 1300px) {
    .skeleton-items {
      display: none;
    }

    .logo-wrapper {
      display: flex;
      justify-content: center;
    }
  }
</style>



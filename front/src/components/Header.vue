<template>
  <header class="top">
    <div class="top-bar wrapper">
      <h1 class="logo-wrapper">
        <router-link to="/">
          <img src="http://cdn2.jianshu.io/assets/web/logo-58fd04f6f0de908401aa561cda6a0688.png" alt="logo" class="logo">
        </router-link>
      </h1>
      <div class="bars">
        <router-link 
          class="bar" 
          v-for="(menu,i) in menus" 
          :key="i" 
          :to="menu.url">
          {{menu.name}}
        </router-link>
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
  .top {
    width: 100%;
    height: $height;
    background: #fff;
    display: flex;
    justify-content: center;
  }

  .top-bar {
    flex-direction: row;
    align-items: center;
  }

  .logo-wrapper {
    flex: 1;
  }

  .logo {
    width: 40px;
  }

  .bars {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .skeleton {
    width: 30px;
    height: 20px;
    margin-left: 40px;
    background: #f5f5f5;
    font-size: 15px;
  }
  
  .bar {
    height: $height;
    padding: 0 20px;
    line-height: $height;
    text-align: center;
    color: #333;
    font-size: 15px;
  }

  .bar:last-child {
    padding-right: 0;
  }

  .bar:hover {
    color: #999;
  }

  @media (max-width: 1300px) {
    .bars {
      display: none;
    }

    .logo-wrapper {
      display: flex;
      justify-content: center;
    }
  }
</style>



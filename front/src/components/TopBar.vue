<template>
  <div class="top">
    <div class="top-bar">
      <h1 class="logo-wrapper">
        <router-link to="/" class="logo"></router-link>
      </h1>
      <div class="bars">
        <router-link 
          class="bar" 
          v-for="(bar,i) in topBars" 
          :key="i" 
          :to="bar.url">
          {{bar.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    logo: {
      default: '',
    },
    topBars: {
      default: () => [{
        name: '主页',
        url: '/',
        icon: 'xxxx',
        selectColor: '#d5d5d5',
      },
      {
        name: '归档',
        url: '/archive',
        icon: 'xxxx',
        selectColor: '#d5d5d5',
      },
      {
        name: '分类',
        url: '/catalog',
        icon: 'xxxx',
        selectColor: '#d5d5d5',
      },
      {
        name: '关于',
        url: '/about',
        icon: 'xxxx',
        selectColor: '#d5d5d5',
      }],
    },
  },
  data() {
    return {

    };
  },
};

</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
  }

  .top-bar {
    width: 1100px;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .logo-wrapper {
    flex: 1;
  }

  .logo {
    width: 40px;
    height: 40px;
    background-image: url('//img.alicdn.com/tps/i2/TB1bNE7LFXXXXaOXFXXwFSA1XXX-292-116.png_145x145.jpg');
    background-size: 40px 40px;
  }

  .bars {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  
  .bar {
    height: 70px;
    width: 100px;
    line-height: 70px;
    text-align: center;
    color: #333;
  }

  .bar:hover {
    color: #999;
  }
</style>



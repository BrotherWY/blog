<template>
  <div class="top">
    <div class="top-bar wrapper">
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

  @media (max-width: 1000px) {
    .bars {
      display: none;
    }

    .logo-wrapper {
      display: flex;
      justify-content: center;
    }
  }
</style>



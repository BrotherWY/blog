import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import App from './App.vue';
import createRouter from './routes/index';
import Mixin from './mixin/Mixin';
// process bar
Vue.use(VueProgressBar, {
  color: '#bffaf3',
  failedColor: 'red',
  height: '2px',
});

Vue.mixin(Mixin);

export default function createApp() {
  // 创建 router 实例
  const router = createRouter();
  const app = new Vue({
    router,
    render: h => h(App),
  });
  return { app, router };
}

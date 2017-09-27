import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import createRouter from './routes/index';
import createStore from './store/index';
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
  const store = createStore();
  // 同步路由状态(route state)到 store
  sync(store, router);
  const app = new Vue({
    store,
    router,
    render: h => h(App),
  });
  return { app, router, store };
}

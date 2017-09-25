import Vue from 'vue';
import App from './App.vue';
import createRouter from './routes/index';
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export default function createApp() {
  // 创建 router 实例
  const router = createRouter();
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App),
  });
  return { app, router };
}

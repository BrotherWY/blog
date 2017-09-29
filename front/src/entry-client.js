import Vue from 'vue';
import createApp from '@/app';
import ProgressBar from '@/components/ProgressBar';

Vue.prototype.$bar = new Vue(ProgressBar).$mount();
const bar = Vue.prototype.$bar;
document.body.appendChild(bar.$el);

// 客户端特定引导逻辑……
const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    if (!activated.length) {
      return next();
    }
    // 这里如果有加载指示器(loading indicator)，就触发
    bar.start();
    Promise.all(activated.map((c) => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to });
      }
      return null;
    })).then(() => {
      // 停止加载指示器(loading indicator)
      bar.finish();
      next();
    }).catch(() => {
      bar.fail();
      next();
    });
  });
  app.$mount('#app');
});

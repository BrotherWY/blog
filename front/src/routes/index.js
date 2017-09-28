import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        component: () => import('@/pages/Home.vue'),
      },
      {
        path: '/archive',
        component: () => import('@/pages/Archive.vue'),
      },
      {
        path: '/tag',
        component: () => import('@/pages/Tag.vue'),
      },
      {
        path: '/about',
        component: () => import('@/pages/About.vue'),
      },
    ],
  });
}

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
        component: () => import('@/pages/home/Home.vue'),
      },
      {
        path: '/archive',
        component: () => import('@/pages/archive/Archive.vue'),
      },
      {
        path: '/tag',
        component: () => import('@/pages/tag/Tag.vue'),
      },
      {
        path: '/catalog',
        component: () => import('@/pages/catalog/Catalog.vue'),
      },
      {
        path: '/about',
        component: () => import('@/pages/about/About.vue'),
      },
    ],
  });
}

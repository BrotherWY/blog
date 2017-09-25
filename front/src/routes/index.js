import Vue from 'vue';
import Router from 'vue-router';
import gameRoute from '@/routes/game';
import homeRoute from '@/routes/home';

Vue.use(Router);

const routes = [].concat(
  gameRoute,
  homeRoute,
);

export default function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });
}

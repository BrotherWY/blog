import { FETCH_MENUS, SET_MENUS, FETCH_TAGS, SET_TAGS } from '@/store/mutation-types';
import HttpClient from '@/network/HttpClientPromise';

export default {
  namespaced: true,
  state: {
    menus: [],
    tags: [],
  },
  getters: {},
  actions: {
    [FETCH_MENUS]({ commit }) {
      HttpClient.get('/menu')
      .then((data) => {
        commit(SET_MENUS, data.list);
      });
    },
    [FETCH_TAGS]({ commit }) {
      HttpClient.get('/tags')
      .then((data) => {
        commit(SET_TAGS, data.list);
      });
    },
  },
  mutations: {
    [SET_MENUS](state, menus) {
      state.menus = menus;
    },
    [SET_TAGS](state, tags) {
      state.tags = tags;
    },
  },
};

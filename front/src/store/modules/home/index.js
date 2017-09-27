import { FETCH_MENUS, SET_MENUS } from '@/store/mutation-types';
import HttpClient from '@/network/HttpClientPromise';

export default {
  namespaced: true,
  state: {
    menus: [],
  },
  getters: {},
  actions: {
    [FETCH_MENUS]({ commit }) {
      HttpClient.get('/menu')
      .then((data) => {
        commit(SET_MENUS, data.list);
      })
      .catch(() => {

      });
    },
  },
  mutations: {
    [SET_MENUS](state, menus) {
      state.menus = menus;
    },
  },
};

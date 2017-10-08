import { FETCH_HEADER, SET_HEADER } from '@/store/mutation-types';
import HttpClient from '@/network/HttpClientPromise';

export default {
  namespaced: true,
  state: {
    header: {},
  },
  getters: {},
  actions: {
    [FETCH_HEADER]({ commit }) {
      HttpClient.get('/header')
      .then((data) => {
        commit(SET_HEADER, data);
      });
    },
  },
  mutations: {
    [SET_HEADER](state, data) {
      state.header = data.header;
    },
  },
};

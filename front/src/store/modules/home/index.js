import { FETCH_INDEX, SET_INDEX } from '@/store/mutation-types';
import HttpClient from '@/network/HttpClientPromise';

export default {
  namespaced: true,
  state: {
    tags: [],
    userInfo: {},
    articles: [],
    hots: [],
  },
  getters: {},
  actions: {
    [FETCH_INDEX]({ commit }) {
      HttpClient.get('/1.0/index')
      .then((data) => {
        commit(SET_INDEX, data);
      });
    },
  },
  mutations: {
    [SET_INDEX](state, data) {
      state.tags = data.tags;
      state.userInfo = data.userInfo;
      state.articles = data.articles;
      state.hots = data.hots;
    },
  },
};

import { FETCH_INDEX, SET_INDEX } from '@/store/mutation-types';
import HttpClient from '@/network/HttpClientPromise';

export default {
  namespaced: true,
  state: {
    header: {},
    tags: [],
    userInfo: {},
    articles: [],
    recents: [],
  },
  getters: {},
  actions: {
    [FETCH_INDEX]({ commit }) {
      HttpClient.get('/index')
      .then((data) => {
        commit(SET_INDEX, data);
      });
    },
  },
  mutations: {
    [SET_INDEX](state, data) {
      state.header = data.header;
      state.tags = data.tags;
      state.userInfo = data.userInfo;
      state.articles = data.articles;
      state.recents = data.recents;
    },
  },
};

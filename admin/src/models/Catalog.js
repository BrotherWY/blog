import { FETCH_ALL, SET_ALL } from '../constants/ActionType';
import { findAll } from '../services/CatalogService';

export default {
  namespace: 'catalog',
  state: {
    catalogs: [],
  },
  reducers: {
    [SET_ALL](state, { payload: { catalogs } }) {
      return { ...state, catalogs };
    },
  },
  effects: {
    * [FETCH_ALL]({}, { call, put }) {
      const data = yield call(findAll);
      if (data.success) {
        yield put({
          type: SET_ALL,
          payload: {
            catalogs: data.data,
          },
        });
      } else {
        throw data.msg;
      }
    },
  },
};

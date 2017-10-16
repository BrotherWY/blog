import { FETCH_ALL, SET_ALL, ADD, ADD_AFTER } from '../constants/ActionType';
import { findAll, add } from '../services/TagService';

export default {
  namespace: 'tag',
  state: {
    tags: [],
  },
  reducers: {
    [SET_ALL](state, { payload: { tags } }) {
      return { ...state, tags };
    },
    [ADD_AFTER](state, { payload: { tags } }) {
      return { ...state, tags };
    },
  },
  effects: {
    * [FETCH_ALL]({}, { call, put }) {
      const data = yield call(findAll);
      if (data.success) {
        yield put({
          type: SET_ALL,
          payload: {
            tags: data.data,
          },
        });
      } else {
        throw data.msg;
      }
    },
    * [ADD]({ payload: { tag } }, { call, put }) {
      const data = yield call(add, tag);
      if (data.success) {
        yield put({
          type: ADD_AFTER,
          payload: {
            tags: data.data,
          },
        });
      } else {
        throw data.msg;
      }
    },
  },
};

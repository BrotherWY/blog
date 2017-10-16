import { message } from 'antd';
import { FETCH_ALL, SET_ALL, ADD, UPDATE, DELETE } from '../constants/ActionType';
import { findAll, add, update, remove } from '../services/TagService';

export default {
  namespace: 'tag',
  state: {
    tags: [],
  },
  reducers: {
    [SET_ALL](state, { payload: { tags } }) {
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
    * [ADD]({ payload: tag }, { call }) {
      const data = yield call(add, tag);
      if (data.success) {
        message.success('添加成功');
      } else {
        throw data.msg;
      }
    },
    * [UPDATE]({ payload: tag }, { call, put }) {
      const data = yield call(update, tag);
      if (data.success) {
        message.success('更新成功');
        yield put({ type: FETCH_ALL });
      } else {
        throw data.msg;
      }
    },
    * [DELETE]({ payload: id }, { call, put }) {
      const data = yield call(remove, id);
      if (data.success) {
        message.success('删除成功');
        yield put({ type: FETCH_ALL });
      } else {
        throw data.msg;
      }
    },
  },
};

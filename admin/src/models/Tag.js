import { message } from 'antd';
import { FETCH_ALL, SET_ALL, ADD, UPDATE, DELETE, PAGING, BATCH_DELETE } from '../constants/ActionType';
import { findAll, findAllByPaging, add, update, remove, batchDelete } from '../services/TagService';

export default {
  namespace: 'tag',
  state: {
    tags: [],
    total: 0,
  },
  reducers: {
    [SET_ALL](state, { payload: { tags, total } }) {
      return { ...state, tags, total };
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
    * [PAGING]({ payload: { pageIndex, pageSize } }, { call, put }) {
      const data = yield call(findAllByPaging, { pageIndex, pageSize });
      if (data.success) {
        yield put({
          type: SET_ALL,
          payload: {
            tags: data.data.rows,
            total: data.data.count,
          },
        });
      } else {
        throw data.msg;
      }
    },
    * [BATCH_DELETE]({ payload: { pageIndex, pageSize, selectIds } }, { call, put }) {
      const result = yield call(batchDelete, selectIds);
      if (result.success) {
        message.success('批量删除成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize } });
      } else {
        throw result.msg;
      }
    },
    * [ADD]({ payload: { pageIndex, pageSize, data } }, { call, put }) {
      const result = yield call(add, data);
      if (result.success) {
        message.success('添加成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize } });
      } else {
        throw result.msg;
      }
    },
    * [UPDATE]({ payload: { pageIndex, pageSize, data } }, { call, put }) {
      const result = yield call(update, data);
      if (result.success) {
        message.success('更新成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize } });
      } else {
        throw result.msg;
      }
    },
    * [DELETE]({ payload: { pageIndex, pageSize, id } }, { call, put }) {
      const result = yield call(remove, id);
      if (result.success) {
        message.success('删除成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize } });
      } else {
        throw result.msg;
      }
    },
  },
};

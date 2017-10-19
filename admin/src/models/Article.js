import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { FETCH_ALL, SET_ALL, ADD, UPDATE, DELETE, PAGING, BATCH_DELETE, SEARCH, UPDATE_STATU, BATCH_UPDATE_STATU } from '../constants/ActionType';
import { findAll, findAllByPaging, add, update, remove, batchDelete, search, updateStatu, batchUpdateStatu } from '../services/ArticleService';

export default {
  namespace: 'article',
  state: {
    articles: [],
    total: 0,
  },
  reducers: {
    [SET_ALL](state, { payload: { articles, total } }) {
      return { ...state, articles, total };
    },
  },
  effects: {
    * [ADD]({ payload: article }, { call }) {
      const data = yield call(add, article);
      const msg = article.flag === 0 ? '存入草稿成功' : '发布文章成功';
      const path = article.flag === 0 ? '/article/draft' : '/article';
      if (data.success) {
        message.success(msg);
        routerRedux.push(path);
      } else {
        throw data.msg;
      }
    },
    * [FETCH_ALL]({}, { call, put }) {
      const data = yield call(findAll);
      if (data.success) {
        yield put({
          type: SET_ALL,
          payload: {
            articles: data.data,
          },
        });
      } else {
        throw data.msg;
      }
    },
    * [PAGING]({ payload: { pageIndex, pageSize, flag } }, { call, put }) {
      const data = yield call(findAllByPaging, { pageIndex, pageSize, flag });
      if (data.success) {
        yield put({
          type: SET_ALL,
          payload: {
            articles: data.data.rows,
            total: data.data.count,
          },
        });
      } else {
        throw data.msg;
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
    * [UPDATE_STATU]({ payload: { pageIndex, pageSize, id, flag } }, { call, put }) {
      const result = yield call(updateStatu, { id, flag });
      if (result.success) {
        message.success('状态更新成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize } });
      } else {
        throw result.msg;
      }
    },
    * [BATCH_UPDATE_STATU]({ payload: { pageIndex, pageSize, selectIds, flag } }, { call, put }) {
      const result = yield call(batchUpdateStatu, { selectIds, flag });
      if (result.success) {
        message.success('状态批量更新成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize } });
      } else {
        throw result.msg;
      }
    },
    * [DELETE]({ payload: { pageIndex, pageSize, id, flag } }, { call, put }) {
      const result = yield call(remove, id);
      if (result.success) {
        message.success('删除成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize, flag } });
      } else {
        throw result.msg;
      }
    },
    * [BATCH_DELETE]({ payload: { pageIndex, pageSize, selectIds, flag } }, { call, put }) {
      const result = yield call(batchDelete, selectIds);
      if (result.success) {
        message.success('批量删除成功');
        yield put({ type: PAGING, payload: { pageIndex, pageSize, flag } });
      } else {
        throw result.msg;
      }
    },
    * [SEARCH]({ payload: { pageIndex, pageSize, data } }, { call, put }) {
      const result = yield call(search, { pageIndex, pageSize, data });
      if (result.success) {
        yield put({
          type: SET_ALL,
          payload: {
            articles: result.data.rows,
            total: result.data.count,
          },
        });
      } else {
        throw result.msg;
      }
    },
  },
};

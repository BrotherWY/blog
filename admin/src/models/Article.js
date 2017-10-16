import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { ADD } from '../constants/ActionType';
import { add } from '../services/ArticleService';

export default {
  namespace: 'article',
  state: {
    success: false,
  },
  reducers: {
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
  },
};

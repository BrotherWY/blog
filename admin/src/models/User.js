import { routerRedux } from 'dva/router';
import { SET, USER_LOGIN } from '../constants/ActionType';
import { login } from '../services/UserService';

export default {
  namespace: 'user',
  state: {
    user: {},
  },
  reducers: {
    [SET](state, { payload: { user } }) {
      return { ...state, user };
    },
  },
  effects: {
    * [USER_LOGIN]({ payload: { userName, password } }, { call, put }) {
      const data = yield call(login, { userName, password });
      if (data.success) {
        yield put({
          type: SET,
          payload: {
            user: data.data,
          },
        });
        yield put(routerRedux.push('/dashboard'));
      } else {
        throw data.msg;
      }
    },
  },
};

import { routerRedux } from 'dva/router';
import { USER_SET, USER_LOGIN } from '../constants/ActionType';
import { login } from '../services/UserService';

export default {
  namespace: 'user',
  state: {
    user: {},
  },
  reducers: {
    [USER_SET](state, { payload: { user } }) {
      return { ...state, user };
    },
  },
  effects: {
    * [USER_LOGIN]({ payload: { userName, password } }, { call, put }) {
      const data = yield call(login, { userName, password });
      if (data.success) {
        yield put({
          type: USER_SET,
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

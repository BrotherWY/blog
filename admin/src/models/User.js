import * as ActionType from '../constants/ActionType';
import * as UserService from '../services/UserService';

export default {
  namespace: 'user',
  state: {
    user: {},
    isSuccess: true, // 是否成功 false 成功 true 失败
  },
  reducers: {
    [ActionType.USER_SET](state, { payload: { user, isSuccess } }) {
      return { ...state, user, isSuccess };
    },
  },
  effects: {
    * [ActionType.USER_LOGIN]({ payload: { userName, password } }, { call, put }) {
      /**
       * data is array
       * 0: user data,
       * 1: 是否成功 false 成功 true 失败
       */
      const data = yield call(UserService.login, { userName, password });
      yield put({
        type: ActionType.USER_SET,
        payload: {
          user: data[0],
          isSuccess: data[1],
        },
      });
    },
  },
};

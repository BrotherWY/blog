const DELETE = 'delete';
export default {
  namespace: 'products',
  state: [],
  reducers: {
    [DELETE](state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};

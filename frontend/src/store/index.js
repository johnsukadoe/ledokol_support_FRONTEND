import { createStore } from 'vuex';

export default createStore({
  state: {
    userid:null,
  },
  mutations: {
    setUserId(state, userid) {
      state.userid = userid
    }
  },
  modules: {
    getUserId: state => state.userid
  },
});

import { createStore } from "vuex";

const someinfo = import.meta.env.SOMETHING;

export default createStore({
  state: {
    userInfo: {
      token: "something",
      email: "",
      user_id: "",
      refreshToken: "",
      expiresIn: "",
    },
  },
  mutations: {
    setUserId(state, payload) {
      state.userInfo = payload;
    },
  },
  modules: {
    getUserId: (state) => state.userid,
  },
});

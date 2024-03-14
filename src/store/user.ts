// initial state
import { StoreOptions } from "vuex";
import ROLE_ENUM from "@/access/roleEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "Sign in",
      userRole: ROLE_ENUM.NOT_LOGIN,
    },
  }),
  actions: {
    // todo login
    async getLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state: { loginUser: any }, payload: any) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;

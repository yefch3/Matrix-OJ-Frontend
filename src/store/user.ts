// initial state
import { StoreOptions } from "vuex";
import ROLE_ENUM from "@/access/roleEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    // loginUser: {
    //   userName: "Sign in",
    // },
  }),
  actions: {
    // todo login
    async getLoginUser({ commit, state }) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ROLE_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state: { loginUser: any }, payload: any) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;

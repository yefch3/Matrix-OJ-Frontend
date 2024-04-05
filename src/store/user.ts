// initial state
import { StoreOptions } from "vuex";
import ROLE_ENUM from "@/access/roleEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: null,
      userRole: ROLE_ENUM.NOT_LOGIN,
    },
  }),
  actions: {
    // todo login
    async getLoginUser({ commit, state }) {
      const res = await UserControllerService.getLoginUserUsingGet();
      // console.log(res.data);
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ROLE_ENUM.NOT_LOGIN,
        });
      }
    },
    // todo logout
    async userLogout({ commit }) {
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        commit("updateUser", {
          userName: null,
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

import ROLE_ENUM from "@/access/roleEnum";
import router from "@/router";
import store from "@/store";
import roleCheck from "@/access/roleCheck";

router.beforeEach(async (to, from, next) => {
  console.log("loginUser", store.state.user.loginUser);
  const loginUser = store.state.user.loginUser;
  // 未登录，自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  const needRole = (to.meta?.access ?? ROLE_ENUM.NOT_LOGIN) as string;
  if (needRole !== ROLE_ENUM.NOT_LOGIN) {
    // 未登录，跳转登录页，并重定向到目标页
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 无权限，跳转无权限页
    if (!roleCheck(loginUser, needRole)) {
      next("/no-auth");
      return;
    }
  }
  next();
});

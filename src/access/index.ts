import ROLE_ENUM from "@/access/roleEnum";
import router from "@/router";
import store from "@/store";
import roleCheck from "@/access/roleCheck";

router.beforeEach(async (to, from, next) => {
  await store.dispatch("user/getLoginUser");
  const loginUser = store.state.user.loginUser;
  console.log("loginUser", loginUser);
  // 如果是用户页，且未登录，跳转登录页
  if (
    to.path === "/user" &&
    (!loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ROLE_ENUM.NOT_LOGIN)
  ) {
    // console.log("未登录，跳转登录页");
    next(`/user/login?redirect=${to.fullPath}`);
    return;
  }

  // 如果是登录页，且已登录，跳转首页
  if (
    to.path === "/user/login" &&
    loginUser.userRole &&
    loginUser.userRole !== ROLE_ENUM.NOT_LOGIN
  ) {
    // console.log("已登陆，跳转首页");
    next("/");
    return;
  }

  // 其他页面，未登录，自动登录
  // if (!loginUser || !loginUser.userRole) {
  //   await store.dispatch("user/getLoginUser");
  // }
  const needRole = (to.meta?.access ?? ROLE_ENUM.NOT_LOGIN) as string;
  // 其他页面，需要的权限不是未登录，那么需要登录
  if (needRole !== ROLE_ENUM.NOT_LOGIN) {
    // 未登录，跳转登录页，并重定向到目标页
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ROLE_ENUM.NOT_LOGIN
    ) {
      // console.log("未登录，跳转登录页");
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 已经登陆但是无权限，跳转无权限页
    if (!roleCheck(loginUser, needRole)) {
      next("/no-auth");
      return;
    }
  }
  // 需要的权限是未登录，那么无论是否登陆都跳转
  next();
  return;
});

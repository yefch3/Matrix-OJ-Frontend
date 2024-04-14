import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ROLE_ENUM from "@/access/roleEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddProblemView from "@/views/problem/AddProblemView.vue";
import ManageProblemView from "@/views/problem/ManageProblemView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "User",
    component: UserLayout,
    meta: {
      hideInMenu: true,
      access: ROLE_ENUM.USER,
    },
    children: [
      {
        path: "/user/login",
        name: "Login",
        component: UserLoginView,
        meta: {
          access: ROLE_ENUM.NOT_LOGIN,
        },
      },
      {
        path: "/user/register",
        name: "Register",
        component: UserRegisterView,
        meta: {
          access: ROLE_ENUM.NOT_LOGIN,
        },
      },
    ],
  },
  {
    path: "/",
    name: "Problems",
    component: HomeView,
    meta: {
      access: ROLE_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/no-auth",
    name: "NoAuth",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
      meta: {
        access: ROLE_ENUM.NOT_LOGIN,
      },
    },
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: AdminView,
  //   meta: {
  //     access: ROLE_ENUM.ADMIN,
  //   },
  // },
  {
    path: "/add/problem",
    name: "Add Problem",
    component: AddProblemView,
    meta: {
      access: ROLE_ENUM.ADMIN,
    },
  },
  {
    path: "/update/problem",
    name: "Update Problem",
    component: AddProblemView,
    meta: {
      hideInMenu: true,
      access: ROLE_ENUM.ADMIN,
    },
  },
  {
    path: "/manage/problem",
    name: "Manage Problem",
    component: ManageProblemView,
    meta: {
      access: ROLE_ENUM.ADMIN,
    },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

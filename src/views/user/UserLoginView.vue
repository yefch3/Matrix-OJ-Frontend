<template>
  <div id="userLoginView">
    <h1>Log in</h1>
    <a-form
      :model="form"
      :style="{ width: '400px' }"
      @submit="handleLogin"
      auto-label-width
    >
      <a-form-item
        field="userAccount"
        tooltip="Please enter username"
        label="Account"
      >
        <a-input
          v-model="form.userAccount"
          placeholder="Please enter your account"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="Please enter password"
        label="Password"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="Please enter your password"
        />
      </a-form-item>
      <!--      <a-form-item field="isRead">-->
      <!--        <a-checkbox v-model="form.rememberMe">Remember me</a-checkbox>-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-button type="primary" html-type="submit">Log in</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
  rememberMe: false,
}) as UserLoginRequest;
const router = useRouter();
const store = useStore();

const handleLogin = async () => {
  const redirect = router.currentRoute.value.query.redirect as string;
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser", res.data);
    // 如果登录成功，跳转到首页或者重定向页面
    if (redirect) {
      // todo: 查询参数，从redirect里面分割，在?之后的参数
      const queryParams = redirect.split("?")[1];
      await router.push({
        path: redirect,
        query: {
          // todo: 可能有更好的方法分割
          ...Object.fromEntries(new URLSearchParams(queryParams)),
        },
        replace: true,
      });
    } else {
      await router.push({
        path: "/",
        replace: true,
      });
    }
  } else {
    message.error("Login failed: " + res.message);
  }
};
</script>

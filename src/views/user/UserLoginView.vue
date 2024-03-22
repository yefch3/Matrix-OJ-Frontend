<template>
  <div id="userLoginView">
    <h1>Log in</h1>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
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
      <a-form-item field="isRead">
        <a-checkbox v-model="form.rememberMe">Remember me</a-checkbox>
      </a-form-item>
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

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    alert("Login success" + JSON.stringify(res.data));
    await router.push({ path: "/", replace: true });
    await store.dispatch("/user/getLoginUser", res.data);
  } else {
    message.error("Login failed: " + res.message);
  }
};
</script>

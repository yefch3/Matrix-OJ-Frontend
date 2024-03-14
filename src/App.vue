<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ROLE_ENUM from "@/access/roleEnum";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();
const doInit = () => {
  console.log("Hello, Vue3!");
};

onMounted(() => {
  doInit();
});

router.beforeEach((to, from, next) => {
  if (to.meta?.access === ROLE_ENUM.ADMIN) {
    if (store.state.user.loginUser?.role !== ROLE_ENUM.ADMIN) {
      next("/no-auth");
      return;
    }
  }
  next();
});
</script>

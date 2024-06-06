<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const doInit = () => {
  console.log("Hello, Vue3!");
};

// 获取 body 元素
const body = document.querySelector("body");
// 修改 arco-theme 属性值
body?.setAttribute("arco-theme", "dark");

const route = useRoute();

onMounted(() => {
  doInit();
});
</script>

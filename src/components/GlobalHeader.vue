<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
        style="margin-top: 16px; height: 5vh"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <router-link to="/">
              <img
                class="logo"
                src="../assets/logo.png"
                alt="logo"
                style="cursor: pointer"
              />
            </router-link>
            <router-link to="/">
              <div class="title" style="cursor: pointer">OJ System</div>
            </router-link>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <!--    todo login and logout handle-->
    <a-col flex="100px" style="margin-top: 16px">
      <a-dropdown @submit="handleLogout">
        <a-button @click="handleLogin" style="background-color: #232324">{{
          loginUser?.userName ?? "Sign in"
        }}</a-button>
        <template #content>
          <a-button @click="handleLogout" v-if="loginUser?.userName !== null"
            >Log out</a-button
          >
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import roleCheck from "@/access/roleCheck";
import { UserControllerService } from "../../generated";

const router = useRouter();
const selectedKeys = ref(["/"]);
const store = useStore();
const loginUser = computed(() => store.state.user.loginUser);
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return roleCheck(loginUser.value, item?.meta?.access as string);
  });
});

// update selectedKeys when route changes
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const handleLogout = async () => {
  // console.log("logout");
  await store.dispatch("user/userLogout");
  await router.push({ path: "/", replace: true });
};

const handleLogin = () => {
  if (loginUser.value?.userName === null) {
    router.push({ path: "/user/login" });
  }
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  margin-right: 16px;
  text-align: center;
}

.logo {
  height: 48px;
}
</style>

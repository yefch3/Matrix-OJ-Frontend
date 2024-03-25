<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">OJ System</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <a-dropdown @submit="handleLogout">
        <a-button>{{ loginUser?.userName ?? "Sign in" }}</a-button>
        <template #content>
          <a- html-type="submit">Log out</a->
        </template>
      </a-dropdown>
      <div>
        <!-- 使用 Arco Design 的按钮组件 -->
        <a-button @click="handleLogout">
          {{ "test" }}
        </a-button>
        <!-- 使用 Arco Design 的下拉菜单组件 -->
        <a-dropdown v-model="handleLogout">
          <!-- 下拉菜单内容 -->
          <template #content>
            <a-dropdown-button @click="handleLogout">Logout</a-dropdown-button>
          </template>
        </a-dropdown>
      </div>
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
  console.log("logout");
  await store.dispatch("user/userLogout");
  await router.push({ path: "/", replace: true });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
  margin-right: 16px;
  text-align: center;
}

.logo {
  height: 48px;
}
</style>

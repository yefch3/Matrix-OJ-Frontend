<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <router-link to="/">
            <img
              src="../assets/logo.png"
              class="logo"
              style="cursor: pointer"
              alt="logo"
            />
          </router-link>
          <router-link to="/">
            <div class="title" style="cursor: pointer">OJ System</div>
          </router-link>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--      <a-layout-footer class="footer">-->
      <!--        <a href="https://www.linkedin.co m/in/fangchen-ye" target="_blank">-->
      <!--          Online Judge System by Fangchen-->
      <!--        </a>-->
      <!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout .header {
  background: #232324;
}

#userLayout .content {
  background-color: #232324;
  padding: 20px;
  margin-bottom: 16px;
}

#userLayout .footer {
  background: #232324;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#userLayout .logo {
  height: 64px;
  width: 96px;
  background: rgba(255, 255, 255, 0.2);
}

#userLayout .title {
  margin-left: 16px;
}
</style>

<script setup lang="ts"></script>

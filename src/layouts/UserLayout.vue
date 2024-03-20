<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" class="logo" />
          <div class="title">OJ System</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.linkedin.co m/in/fangchen-ye" target="_blank">
          Online Judge System by Fangchen
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
}

#userLayout .header {
  background: #aaa;
}

#userLayout .content {
  background: linear-gradient(to bottom, #aaa, #fff);
  padding: 20px;
  margin-bottom: 16px;
}

#userLayout .footer {
  background: #efefef;
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
  color: #444;
  margin-left: 16px;
}
</style>

<script setup lang="ts"></script>

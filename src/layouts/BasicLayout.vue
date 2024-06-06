<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--      <a-layout-footer class="footer">-->
      <!--        <a href="https://www.linkedin.com/in/fangchen-ye" target="_blank">-->
      <!--          Online Judge System by Fangchen-->
      <!--        </a>-->
      <!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
  background-color: #232324;
}

#basicLayout .header {
}

#basicLayout .content {
  padding: 20px;
  margin-bottom: 16px;
}

#basicLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

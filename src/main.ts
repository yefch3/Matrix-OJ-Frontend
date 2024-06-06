import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/access";
import "bytemd/dist/index.css";

// 获取 body 元素
const body = document.querySelector("body");
// 修改 arco-theme 属性值
body?.setAttribute("arco-theme", "dark");
createApp(App).use(ArcoVue).use(store).use(router).mount("#app");

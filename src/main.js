import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/less/index.less"; //引入默认样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //引入所有图标

import router from "./router"; // 路由

import { createPinia } from "pinia"; //引入pinia
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //引入pinia持久化插件
const pinia = createPinia(); //创建pinia实例
pinia.use(piniaPluginPersistedstate); //将持久化实例添加到pinia上
import { useAllDataStore } from "@/store/index.js";

import "@/api/mock.js"; // 引入mock

// import api from "@/api/api.js";// 全局注册api

const app = createApp(App);

// app.config.globalProperties.$api = api;//  挂载api
app.use(pinia); // 使用pinia
const store = useAllDataStore();
store.addMenu(router); // 添加动态路由

app.use(router); // 使用路由
// 注册全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app"); // 挂载应用

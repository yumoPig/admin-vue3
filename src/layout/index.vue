<template>
  <div class="common_layout layout-container">
    <el-config-provider :locale="zhCn">
      <el-container class="lay_container">
        <!-- 定义左侧侧边栏容器 -->
        <CommonAside />
        <!-- 定义右侧组件 -->
        <el-container>
          <!-- 定义右侧顶栏容器 -->
          <el-header class="el_header">
            <CommonHeader />
          </el-header>
          <!-- tag -->
          <CommonTag />
          <!-- 定义右侧主要区域容器 -->
          <el-scrollbar>
            <el-main class="right_main">
              <router-view></router-view>
            </el-main>
          </el-scrollbar>
        </el-container>
      </el-container>
    </el-config-provider>
  </div>
</template>

<script setup>
import CommonAside from "./CommonAside.vue";
import CommonHeader from "./CommonHeader.vue";
import CommonTag from "./CommonTag.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useAllDataStore } from "@/store";
const store = useAllDataStore();
onBeforeMount(() => {
  store.clientWidth = document.body.clientWidth;
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/media/index.scss" as *;
.common_layout,
.lay_container {
  height: 100%;
}
.right_main {
  height: 90vh;
  padding: 20px;
  background-color: #f8f8f8;
  overflow: scroll;
}
@media screen and (max-width: $xs) {
  .right_main {
    height: 80vh;
  }
}
.el_header {
  padding-left: 0;
  background-color: #fff;
}
</style>

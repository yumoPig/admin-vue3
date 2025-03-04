<template>
  <div class="common_layout">
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
          <el-main class="right_main">
            <router-view></router-view>
          </el-main>
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
</script>

<style lang="less" scoped>
.common_layout,
.lay_container {
  height: 100%;
}
.el_header {
  background-color: #333;
}
.right_main {
  padding: 0 20px;
}
</style>

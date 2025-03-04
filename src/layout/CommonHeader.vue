<template>
  <div class="header">
    <div class="l_content">
      <el-button size="small">
        <component :is="icon" class="icons" @click="setMenu"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="crumbs">{{
          crumbs.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r_content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useAllDataStore();
const icon = ref("menu");
const getImageUrl = (user) => {
  return new URL(`../assets/img/${user}.png`, import.meta.url).href;
};

const setMenu = () => {
  store.setIsCollapse();
};

const logout = () => {
  store.clearStore();
  router.push("/login");
};

const crumbs = computed(() => {
  return store.crumbs;
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons {
  width: 20px;
  height: 20px;
}
.l_content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r_content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>

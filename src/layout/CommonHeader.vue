<template>
  <div class="layout-navbars-breadcrumb-index">
    <div class="layout-navbars-breadcrumb">
      <el-icon class="layout-navbars-breadcrumb-icon" v-if="isCollapse">
        <Expand @click="setMenu" />
      </el-icon>
      <el-icon class="layout-navbars-breadcrumb-icon" v-else
        ><Fold @click="setMenu"
      /></el-icon>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item>
          <span @click="goHome">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="crumbs">{{ crumbs.name }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="crumbs && crumbs.Submodule">{{
          crumbs.Submodule.name
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r_content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
          <span>{{ userName }}</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="jump">个人中心</el-dropdown-item>
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
const getImageUrl = (user) => {
  return store.photo
    ? store.photo
    : new URL(`../assets/img/${user}.png`, import.meta.url).href;
  // return new URL(`../assets/img/${user}.png`, import.meta.url).href;
};

const userName = computed(() => {
  return store.userName;
});

const setMenu = () => {
  store.setIsCollapse();
};

const logout = () => {
  store.clearStore();
  router.push("/login");
};
const goHome = () => {
  store.crumbs = {};
  router.push("/");
};
const jump = () => {
  let route;
  store.menuList.forEach((item) => {
    if (item.path === "/personal_center") {
      route = item;
    }
  });
  store.selectMenu(route);
  router.push(route.path);
};

const crumbs = computed(() => {
  return store.crumbs;
});
const isCollapse = computed(() => {
  return store.isCollapse;
});
</script>

<style lang="scss" scoped>
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
  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
    .user {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      margin-right: 10px;
    }
  }
}
.layout-navbars-breadcrumb-index {
  height: 50px;
  display: flex;
  align-items: center;
  background: var(--next-bg-topBar);
  border-bottom: 1px solid var(--next-border-color-light);
  .layout-navbars-breadcrumb {
    flex: 1;
    display: flex;
    align-items: center;
    height: inherit;
    .layout-navbars-breadcrumb-icon {
      font-size: 16px;
      cursor: pointer;
      width: 40px;
      height: 100%;
      opacity: 0.8;
    }
  }
}
</style>

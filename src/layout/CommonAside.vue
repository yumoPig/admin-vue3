<template>
  <el-aside class="layout-aside" :class="setCollapseStyle">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activePath"
    >
      <template v-for="item in sortedMenuList" :key="item.path">
        <el-menu-item
          v-if="!item.children"
          :index="item.path"
          @click="clickMenu(item)"
        >
          <component class="icons" :is="'Document'"></component>
          <span class="menu_text">{{ item.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <component class="icons" :is="'Document'"></component>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="subItem in item.children"
              :index="subItem.path"
              :key="subItem.path"
              @click="clickMenu(subItem)"
            >
              <component class="icons" :is="'Document'"></component>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

const store = useAllDataStore();
const router = useRouter();
const route = useRoute();

const isCollapse = computed(() => {
  return store.isCollapse;
});
const list = computed(() => {
  return store.menuList;
});

const sortedMenuList = computed(() => {
  return list.value.sort((a, b) => a.sort - b.sort);
});
const activePath = computed(() => {
  return route.path;
});
const clickMenu = (item) => {
  store.selectMenu(item);
  router.push(item.path);
};

const setCollapseStyle = computed(() => {
  // 手机端
  if (store.clientWidth < 1000) {
    if (!store.isCollapse) {
      document.body.setAttribute("class", "el-popup-parent--hidden");
      const asideEle = document.querySelector(".layout-container");
      const modeDivs = document.createElement("div");
      modeDivs.setAttribute("class", "layout-aside-mobile-mode");
      asideEle.appendChild(modeDivs);
      modeDivs.addEventListener("click", closeLayoutAsideMobileMode);
      return ["layout-aside-mobile", "layout-aside-mobile-open"];
    } else {
      closeLayoutAsideMobileMode();
      return ["layout-aside-mobile", "layout-aside-mobile-close"];
    }
  }
  // pc端
  else {
    if (store.isCollapse) return ["layout-aside-pc-64"];
    return ["layout-aside-pc-220"];
  }
});

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
  const clientWidth = document.body.clientWidth;

  // 手机端
  if (clientWidth < 1000) {
    store.isCollapse = true;
  } else {
    // store.isCollapse = true;
    if (store.isCollapse) return ["layout-aside-pc-64"];
    return ["layout-aside-pc-220"];
  }
};
// 关闭移动端蒙版
const closeLayoutAsideMobileMode = () => {
  const el = document.querySelector(".layout-aside-mobile-mode");
  el?.setAttribute("style", "animation: error-img-two 0.3s");
  setTimeout(() => {
    el?.parentNode?.removeChild(el);
  }, 300);
  const clientWidth = document.body.clientWidth;
  if (clientWidth < 1000) store.isCollapse = true;
  document.body.setAttribute("class", "");
};

// 页面加载前
onBeforeMount(() => {
  onLayoutResize();
  window.addEventListener("resize", onLayoutResize);
});
// 页面卸载时
onUnmounted(() => {
  window.removeEventListener("resize", onLayoutResize);
});
</script>

<style lang="scss" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  height: 100%;
  background-color: #545c64;
}
:deep(.--el-menu-hover-bg-color) {
  background-color: #000;
}
</style>

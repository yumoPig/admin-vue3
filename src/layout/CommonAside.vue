<template>
  <el-aside :width="isCollapse ? '64px' : '180px'">
    <el-menu
      background-color="background-color:#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activePath"
    >
      <h3 v-show="!isCollapse">后台管理系统</h3>
      <el-menu-item
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span class="menu_text">{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="subItem in item.children"
            :index="subItem.path"
            :key="subItem.path"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
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
// const list = ref([
//   { path: "/home", name: "home", label: "首页", icon: "house", url: "Home" },
//   {
//     path: "/mall",
//     name: "mall",
//     label: "商品管理",
//     icon: "video-play",
//     url: "Mall",
//   },
//   { path: "/user", name: "user", label: "用户管理", icon: "user", url: "User" },
//   {
//     path: "/other",
//     name: "other",
//     label: "其他",
//     icon: "location",
//     children: [
//       {
//         path: "/page1",
//         name: "page1",
//         label: "页面1",
//         icon: "setting",
//         url: "Page1",
//       },
//       {
//         path: "/page2",
//         name: "page2",
//         label: "页面2",
//         icon: "setting",
//         url: "Page2",
//       },
//     ],
//   },
// ]);

const list = computed(() => {
  return store.menuList;
});

const noChildren = computed(() => {
  return list.value.filter((item) => !item.children);
});
const hasChildren = computed(() => {
  return list.value.filter((item) => item.children);
});
const activePath = computed(() => {
  return route.path;
});
const clickMenu = (item) => {
  // store.addTags(item);
  store.selectMenu(item);
  router.push(item.path);
};
</script>

<style lang="less" scoped>
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
</style>

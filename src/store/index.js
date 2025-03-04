import { defineStore } from "pinia"; //引入定义store实例
import { ref } from "vue";

export const useAllDataStore = defineStore(
  "allData",
  () => {
    // 是否展开侧边菜单栏
    const isCollapse = ref(false);
    const setIsCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    // 路由tags
    const tags = ref([
      { path: "/home", name: "home", label: "首页", icon: "home" },
    ]);
    const addTags = (router) => {
      if (tags.value.some((item) => item.path === router.path)) return;
      tags.value.push({
        path: router.path,
        name: router.name,
        label: router.label,
        icon: router.icon,
      });
    };
    const removeTags = (router) => {
      tags.value = tags.value.filter((item) => item.path !== router.path);
    };
    const resetTags = () => {
      tags.value = [
        { path: "/home", name: "home", label: "首页", icon: "home" },
      ];
    };

    // 左侧菜单栏
    const menuList = ref([]);
    const updateMenuList = (data) => {
      menuList.value = data;
    };
    // 面包屑
    const crumbs = ref({});
    const selectMenu = (router) => {
      const module = import.meta.glob("../views/**/*.vue"); // 加载对应的模块
      let url = `../views/${router.url}/${router.url}.vue`;
      if (!module[url]) return; //判断该模块是否存在

      if (router.path === "/home" || router.path === "/") {
        crumbs.value = null;
        return;
      }

      addTags(router);
      crumbs.value = router;
    };

    // 动态路由
    const routerList = ref([]);
    const addMenu = (router) => {
      const menu = menuList.value;
      // console.log("menu  ----->  ", menu);
      const module = import.meta.glob("../views/**/*.vue");
      // console.log('module  ----->  ', module);
      const routeArr = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children.forEach((val) => {
            let url = `../views/${val.url}/${val.url}.vue`;
            val.component = module[url]
              ? module[url]
              : () => import("../views/error/error.vue");
            routeArr.push(...item.children);
          });
        } else {
          let url = `../views/${item.url}/${item.url}.vue`;
          item.component = module[url];
          routeArr.push(item);
        }
      });
      console.log("routeArr  ----->  ", routeArr);
      // 解决多账号登录路由bug
      let routers = router.getRoutes();
      routers.forEach((item) => {
        if (
          item.name === "index" ||
          item.name === "login" ||
          item.name === "error"
        )
          return;
        router.removeRoute(item.name);
      });

      routerList.value = [];
      routeArr.forEach((item) => {
        routerList.value.push(router.addRoute("index", item));
      });
      // console.log("routerList  ----->  ", routerList);
    };

    // token
    const token = ref("");

    // 退出登录
    const clearStore = () => {
      token.value = "";
      crumbs.value = {};
      menuList.value = [];
      isCollapse.value = false;
      resetTags();
      routerList.value.forEach((item) => {
        if (item) item();
      });
      localStorage.removeItem("allData");
    };

    return {
      isCollapse,
      setIsCollapse,
      tags,
      addTags,
      removeTags,
      resetTags,
      menuList,
      updateMenuList,
      selectMenu,
      routerList,
      addMenu,
      token,
      clearStore,
      crumbs,
    };
  },
  { persist: true }
);

import { defineStore } from "pinia"; //引入定义store实例
import { ref } from "vue";

// 根据组件名查找匹配的组件文件路径
function findComponentPath(moduleMap, componentName) {
  // 遍历所有可用的模块路径
  for (const path in moduleMap) {
    // 检查路径是否包含组件名，并且是以组件名.vue结尾
    if (path.includes(`/${componentName}/${componentName}.vue`)) {
      return path;
    }
  }
  // 如果没有找到完全匹配的路径，尝试查找部分匹配
  for (const path in moduleMap) {
    if (path.endsWith(`/${componentName}.vue`)) {
      return path;
    }
  }
  return null;
}

export const useAllDataStore = defineStore(
  "allData",
  () => {
    // 用户名称
    const userName = ref("");
    const photo = ref("");

    // 是否展开侧边菜单栏
    const isCollapse = ref(false);
    const setIsCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    // 路由tags
    const tags = ref([]);
    const addTags = (router) => {
      if (tags.value.some((item) => item.path === router.path)) return;
      tags.value.push(router);
    };
    const removeTags = (router) => {
      tags.value = tags.value.filter((item) => item.path !== router.path);
    };
    const resetTags = (route) => {
      tags.value = route ? [route] : [];
    };

    // 左侧菜单栏
    const menuList = ref([]);
    const updateMenuList = (data) => {
      let list = data.filter((item) => {
        if (item.children) {
          item.children = item.children.filter((val) => {
            return val.status === 1;
          });
        }
        return item.status === 1;
      });
      menuList.value = list;
    };
    // 面包屑
    const crumbs = ref({});
    const selectMenu = (router) => {
      const module = import.meta.glob("../views/**/*.vue"); // 加载对应的模块
      // 获取路由路径的最后部分作为组件名
      const componentName = router.path?.split("/").pop();
      // 查找匹配的组件文件
      const componentPath = componentName
        ? findComponentPath(module, componentName)
        : null;

      if (!componentPath) return; //判断该模块是否存在

      if (router.path === "/firstPage" || router.path === "/") {
        crumbs.value = null;
        return;
      }
      addTags(router);
      if (router.pid == 0) return (crumbs.value = router);

      let list = menuList.value.filter((item) => {
        return item.id == router.pid;
      });
      let crumbsObj = list[0];
      crumbsObj.Submodule = router;
      crumbs.value = crumbsObj;
    };

    // 动态路由
    const routerList = ref([]);
    const addMenu = (router) => {
      const menu = menuList.value;
      const module = import.meta.glob("../views/**/*.vue");
      const routeArr = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children.forEach((val) => {
            // 获取路由路径的最后部分作为组件名
            const componentName = val.front_url.split("/").pop();
            // 查找匹配的组件文件
            const componentPath = findComponentPath(module, componentName);
            val.component = componentPath
              ? module[componentPath]
              : () => import("../views/error/error.vue");
            routeArr.push(val);
          });
        } else {
          // 获取路由路径的最后部分作为组件名
          const componentName = item.front_url.split("/").pop();
          // 查找匹配的组件文件
          const componentPath = findComponentPath(module, componentName);
          item.component = componentPath
            ? module[componentPath]
            : () => import("../views/error/error.vue");
          routeArr.push(item);
        }
      });
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
      if (routeArr.length > 0) {
        routerList.value = [];
        routeArr.forEach((item) => {
          // 确保路由对象有正确的path属性
          let routeConfig = {
            bg_url: item.bg_url,
            component: item.component,
            front_url: item.front_url,
            id: item.id,
            name: item.name,
            node_tag: item.node_tag,
            node_tag_desc: item.node_tag_desc,
            path: item.path,
            pid: item.pid,
            sort: item.sort,
            status: item.status,
            meta: item.meta || {},
          };
          const removeRoute = router.addRoute("index", routeConfig);
          routerList.value.push(removeRoute);
        });
      }
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

    // 可视宽度
    const clientWidth = ref("");
    return {
      userName,
      photo,
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
      clientWidth,
    };
  },
  { persist: true }
);

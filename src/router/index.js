import { createRouter, createWebHashHistory } from "vue-router";
import { useAllDataStore } from "@/store/index.js";

// 制定路由规则
const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layout/index.vue"),
    redirect: "/home", // 重定向
    // children: [
    //   {
    //     path: "home",
    //     name: "home",
    //     component: () => import("@/views/home/home.vue"),
    //   },
    //   {
    //     path: "mall",
    //     name: "mall",
    //     component: () => import("@/views/mall/mall.vue"),
    //   },
    //   {
    //     path: "user",
    //     name: "user",
    //     component: () => import("@/views/user/user.vue"),
    //   },
    // ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/error/error.vue"),
  }, // 404 页面路由
];

const router = createRouter({
  // 设置路由模式
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const module = import.meta.glob("../views/**/*.vue"); // 加载对应的模块
  const path = to.path.replace(/^\/+/, "");
  const url = `../views/${path}/${path}.vue`; // 根据路径构造 URL
  const store = useAllDataStore();

  if (!module[url]) return next("/error"); // 判断是否是路由
  if (to.path !== "/login" && !store.token) return next("/login");
  if (!isRoute(to) && to.path !== "/error") return next("/error");
  next();
});
const isRoute = (to) => {
  return router.getRoutes().some((item) => item.path === to.path);
};

export default router;

import Mock from "mockjs";

function params2obj(body) {
  if (!body) return {}; // 如果 body 为 null 或 undefined，返回空对象
  try {
    return JSON.parse(body); // 尝试解析 JSON
  } catch (e) {
    console.error("JSON parsing error:", e);
    return {}; // 解析失败时也返回空对象
  }
}

export default {
  getMenu: (config) => {
    const { username, password } = params2obj(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否正确
    // menuList用于后面做权限分配，根据不同的用户返回不同的菜单
    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "house",
              url: "home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "video-play",
              url: "mall",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "user",
            },
            {
              path: "/other",
              name: "other",
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/page",
                  name: "page",
                  label: "产品管理",
                  icon: "setting",
                  url: "page",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "setting",
                  url: "page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "yumo" && password === "yumo") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "house",
              url: "home",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "user",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -200,
        data: {
          menuList: [],
          token: "",
          message: "用户名或密码错误",
        },
      };
    }
  },
};

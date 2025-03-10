import request from "@/utils/request";

// 登录
const login = (params) => {
  return request.post("/admin/Account/login", params);
};
// 获取菜单栏
const getAllMenu = () => {
  return request.get("/admin/Menu/allMenu");
};
// 获取个人信息详情
const getAdminUserData = () => {
  return request.get("/admin/AdminUser/getAdminUserData");
};

export { login, getAllMenu, getAdminUserData };

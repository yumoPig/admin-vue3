import request from "../utils/request";

const getTableData = () => {
  return request.get("/api/home/getTableData");
};
const getCountData = () => {
  return request.get("/api/home/getCountData");
};
const getChartData = () => {
  return request.get("/api/home/getChartData");
};
const getUserData = (params) => {
  return request.post("/api/user/getUserData", params);
};
const deleteUser = (params) => {
  return request.post("/api/user/deleteUser", params);
};
const addUser = (params) => {
  return request.post("/api/user/addUser", params);
};
const editUser = (params) => {
  return request.post("/api/user/editUser", params);
};
const getMenu = (params) => {
  return request.post("/api/permission/getMenu", params);
};
export {
  getTableData,
  getCountData,
  getChartData,
  getUserData,
  deleteUser,
  addUser,
  editUser,
  getMenu,
};

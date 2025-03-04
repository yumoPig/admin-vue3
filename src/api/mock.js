import Mock from "mockjs";

import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import menuApi from "./mockData/permission";

// 第一个参数是请求的路径，第二个参数是请求的方式，第三个参数制造出的假数据
Mock.mock(/api\/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/api\/home\/getCounteData/, "get", homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);
Mock.mock(/api\/user\/getUserData/, "post", userApi.getUserData);
Mock.mock(/api\/user\/deleteUser/, "post", userApi.deleteUser);
Mock.mock(/api\/user\/addUser/, "post", userApi.addUser);
Mock.mock(/api\/user\/editUser/, "post", userApi.editUser);
Mock.mock(/api\/permission\/getMenu/, "post", menuApi.getMenu);
